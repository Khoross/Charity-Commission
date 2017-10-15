from django.db import models

# Create your models here.


class LACount(models.Model):
    aootype = models.CharField(max_length=1)
    aookey = models.IntegerField()
    aooname = models.CharField(max_length=255)
    expend = models.FloatField(blank=True, null=True)
    income = models.FloatField(blank=True, null=True)
    charity_count = models.IntegerField()
    subsidiary_count = models.IntegerField()


class AreaCount(models.Model):
    aootype = models.CharField(max_length=1)
    expend = models.FloatField(blank=True, null=True)
    income = models.FloatField(blank=True, null=True)
    charity_count = models.IntegerField()
    subsidiary_count = models.IntegerField()


class LAWords(models.Model):
    aootype = models.CharField(max_length=1)
    aookey = models.IntegerField()
    aooname = models.CharField(max_length=255)
    word = models.CharField(max_length=255)
    expend = models.FloatField(blank=True, null=True)
    income = models.FloatField(blank=True, null=True)
    charity_count = models.IntegerField()
    subsidiary_count = models.IntegerField()


class AreaWords(models.Model):
    aooname = models.CharField(max_length=255)
    word = models.CharField(max_length=255)
    expend = models.FloatField(blank=True, null=True)
    income = models.FloatField(blank=True, null=True)
    charity_count = models.IntegerField()
    subsidiary_count = models.IntegerField()
