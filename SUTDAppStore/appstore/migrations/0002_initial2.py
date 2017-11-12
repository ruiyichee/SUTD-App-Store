# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-12 01:57
from __future__ import unicode_literals

import os

from django.db import connection, migrations

def load_data_from_sql(filename):
    file_path = os.path.join(os.path.dirname(__file__), '../sql/', filename)
    sql_statement = open(file_path).read()
    with connection.cursor() as c:
        c.execute(sql_statement)

initial_data = lambda x,y: load_data_from_sql('SUTDAppStoreSchema.sql')


class Migration(migrations.Migration):

    dependencies = [
        ('appstore', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(initial_data),
    ]