# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-15 20:12
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clouds', '0003_auto_20171015_1528'),
    ]

    operations = [
        migrations.DeleteModel(
            name='AreaCount',
        ),
        migrations.DeleteModel(
            name='AreaWords',
        ),
        migrations.DeleteModel(
            name='LACount',
        ),
        migrations.DeleteModel(
            name='LAWords',
        ),
    ]