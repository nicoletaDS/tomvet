# Generated by Django 4.2.4 on 2023-09-03 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointment', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='time',
            field=models.CharField(default='00:00', max_length=50),
        ),
    ]
