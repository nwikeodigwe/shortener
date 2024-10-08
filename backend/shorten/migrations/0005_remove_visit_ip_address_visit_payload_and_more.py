# Generated by Django 5.1.1 on 2024-09-13 06:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shorten', '0004_alter_url_options_alter_visit_options_url_status_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='visit',
            name='ip_address',
        ),
        migrations.AddField(
            model_name='visit',
            name='payload',
            field=models.JSONField(null=True),
        ),
        migrations.AlterField(
            model_name='visit',
            name='browser_client',
            field=models.JSONField(null=True),
        ),
        migrations.AlterField(
            model_name='visit',
            name='url',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='visit_url', to='shorten.url'),
        ),
    ]
