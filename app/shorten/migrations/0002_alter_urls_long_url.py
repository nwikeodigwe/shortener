# Generated by Django 5.1 on 2024-08-29 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shorten', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='urls',
            name='long_url',
            field=models.URLField(),
        ),
    ]
