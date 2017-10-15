from django.core.management.base import BaseCommand, CommandError
from clouds.models import LACount
import pandas as pd


class Command(BaseCommand):
    help = 'Replaces the current contents of LACounts with a csv file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str)

    def handle(self, *args, **options):
        LACount.objects.all().delete()
        new_data = pd.read_csv(options['csv_file'])
        for row in new_data.itertuples():
            try:
                LA = LACount(aootype=row.aootype,
                             aookey=row.aookey,
                             aooname=row.aooname,
                             expend=row.expend,
                             income=row.income,
                             charity_count=row.charity_count,
                             subsidiary_count=row.subsidiary_count,)
                LA.save()
            except Exception as e:
                print(row)
                raise e
