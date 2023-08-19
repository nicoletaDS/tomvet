# Generated by Django 4.2.4 on 2023-08-12 15:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Pet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('birthday', models.DateField(blank=True, null=True)),
                ('cipNr', models.CharField(max_length=255)),
                ('image', models.ImageField(default='pet_img.png', upload_to='pets/')),
                ('passport', models.BooleanField(default=False)),
                ('weight', models.DecimalField(decimal_places=2, max_digits=5)),
                ('owner', models.CharField(blank=True, max_length=255)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pets', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('details', models.TextField(blank=True, null=True)),
                ('startDate', models.DateField()),
                ('endDate', models.DateField()),
                ('repeat', models.CharField(blank=True, max_length=255, null=True)),
                ('done', models.BooleanField(default=False)),
                ('isTreatment', models.BooleanField(default=False)),
                ('pet', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='pets.pet')),
            ],
        ),
    ]
