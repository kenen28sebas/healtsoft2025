# Generated by Django 5.1.6 on 2025-04-22 00:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Gestor_Th', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cita',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_de_solicitud', models.DateTimeField(auto_now_add=True)),
                ('fecha_de_asignacion', models.DateTimeField()),
                ('prioridad', models.CharField(choices=[('Prta', 'Prioritaria'), ('no', 'noacoradrme')], max_length=20)),
                ('estado', models.CharField(choices=[('pendiente', 'Pendiente'), ('confirmada', 'Confirmada'), ('cancelada', 'Cancelada')], max_length=20)),
                ('cups', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Gestor_Th.cups')),
            ],
        ),
    ]
