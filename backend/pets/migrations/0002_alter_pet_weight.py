# Generated by Django 4.2.4 on 2023-09-03 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pets', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='weight',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
