from django.db import models

# Create your models here.


class WordData(models.Model):
    aootype = models.CharField(max_length=1)
    aookey = models.IntegerField()
    aooname = models.CharField(max_length=255)
    expend = models.FloatField(blank=True, null=True)
    income = models.FloatField(blank=True, null=True)
    charity_count = models.IntegerField()
    subsidiary_count = models.IntegerField()
    calc_type = models.SmallIntegerField(db_column='calc_type')
    calc_name = models.CharField(max_length=50)
    calc_type_strings=["tf.idf", "Relative weighted frequency", "Weighted frequency", "Total"]
