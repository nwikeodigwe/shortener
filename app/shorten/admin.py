from typing import Any
from django.db.models.aggregates import Count
from django.contrib import admin, messages
from django.db.models.query import QuerySet
from django.http import HttpRequest
from django.utils.html import format_html
from django.utils.http import urlencode
from django.urls import reverse
from .models import Url, Visit

class NumberOfVisitFilter(admin.SimpleListFilter):
    title = 'Number of visit'
    parameter_name = 'visits'

    def lookups(self, request: Any, model_admin: Any) -> list[tuple[Any, str]]:
        return [
            ('<10', 'low'),
            ('>10', 'high')
        ]
    
    def queryset(self, request: Any, queryset: QuerySet[Any]) -> QuerySet[Any] | None:
        if self.value() == '<10': 
            return queryset.annotate(visit_count=Count('url_visit')).filter(visit_count__lt=10)
        if self.value() == '>=10': 
            return queryset.annotate(visit_count=Count('url_visit')).filter(visit_count__gte=10)
        return queryset

@admin.register(Url)
class UrlAdmin(admin.ModelAdmin):
    actions = ['clear_visits', 'deactivate_url']
    list_display = ['long_url', 'url_code', 'status', 'number_of_visit', 'created_at']
    list_editable = ['url_code', 'status']
    ordering = ['created_at', 'status']
    list_per_page = 10
    search_fields = ['long_url__icontains', 'url_code__icontains']
    list_filter = ['status', 'created_at', NumberOfVisitFilter]

    @admin.display(ordering='number_of_visit')
    def number_of_visit(self, url):
        visit_url = reverse('admin:shorten_visit_changelist') + '?' + urlencode({
            'url__id': str(url.id) 
        })
        return format_html('<a href="{}">{}</a>', visit_url, url.visit_count)
        

    def get_queryset(self, request: HttpRequest) -> QuerySet[Any]:
        return super().get_queryset(request).annotate(
            visit_count=Count('url_visit')
        )
    
    @admin.action(description='Clear visits')
    def clear_visits(self, request, queryset):
        visit_ids = Visit.objects.filter(url__in=queryset).values_list('id', flat=True)
        Visit.objects.filter(id__in=visit_ids).delete()
        self.message_user(
            request,
            f'Visits for the selected URLs were successfully cleared',
            messages.SUCCESS
        )

    @admin.action(description='Mark selected urls as inactive')
    def deactivate_url(self, request, queryset):
        queryset.update(status='i')


@admin.register(Visit)
class VisitAdmin(admin.ModelAdmin):
    autocomplete_fields = ['url']
    list_display = ['browser_client', 'ip_address', 'created_at']
    list_per_page = 10
