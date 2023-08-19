from django.db import models


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='products/', default='wheat.png')
    price = models.DecimalField(max_digits=8, decimal_places=2)
    sell_by = models.CharField(max_length=20)
    category = models.CharField(max_length=255)
    count_in_stock = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return self.title + " " + self.category
