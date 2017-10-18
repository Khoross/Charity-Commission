from django.db import models

# Create your models here.


class WordData(models.Model):
    aootype = models.CharField(max_length=1)
    aookey = models.IntegerField()
    aooname = models.CharField(max_length=255)
    expend = models.FloatField()
    income = models.FloatField()
    charity_count = models.FloatField()
    subsidiary_count = models.FloatField()
    calc_type = models.SmallIntegerField(db_column='calc_type')
    calc_name = models.CharField(max_length=50)
    calc_type_strings=["tf.idf", "Relative weighted frequency", "Weighted frequency", "Total"]
