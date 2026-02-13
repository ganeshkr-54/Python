from django.db import models
from django.urls import reverse                         

class Products(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    stock = models.IntegerField()
    image_url = models.CharField(max_length=2083)

class offer(models.Model):
    code = models.CharField()
    description = models.CharField()
    discount = models.FloatField()