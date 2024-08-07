# Generated by Django 5.0.6 on 2024-07-04 23:43

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_object_iformat_alter_object_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='object',
            name='path',
            field=models.TextField(verbose_name='Path'),
        ),
        migrations.AlterField(
            model_name='object',
            name='sharedTo',
            field=models.ManyToManyField(blank=True, null=True, related_name='sharedTo', to=settings.AUTH_USER_MODEL, verbose_name='Shared To'),
        ),
    ]
