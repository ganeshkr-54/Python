from django.contrib import admin
from .models import Products, offer

class ProductsAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock')

class offersadmin(admin.ModelAdmin):
    list_display = ('code', 'discount')


admin.site.register(offer, offersadmin)
admin.site.register(Products, ProductsAdmin)

