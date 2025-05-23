# Generated by Django 5.1.6 on 2025-04-22 00:12

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Gestor_Th', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('nro_doc', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('tipo_doc', models.CharField(choices=[('CC', 'cedula de ciudadania'), ('CE', 'cedula de Extranjeria'), ('TI', 'Tarjeta de identidad'), ('RC', 'Registro civil'), ('PA', 'Pasaporte'), ('ASI', 'Adulto sin identificaion'), ('MSI', 'Menor sin identificaion')], max_length=3)),
                ('lugar_exp_doc', models.CharField(max_length=50)),
                ('fecha_exp_doc', models.DateField()),
                ('sexo', models.CharField(choices=[('M', 'Masculino'), ('F', 'Femenino'), ('I', 'Indeterminado')], max_length=1)),
                ('fecha_nacimiento', models.DateField()),
                ('estado_civil', models.CharField(choices=[('Soltero', 'Soltero'), ('Casado', 'Casado'), ('Divorciado', 'Divorciado'), ('Viudo', 'Viudo'), ('Union Libre', 'Union Libre'), ('Separado', 'Separado')], max_length=15)),
                ('telefono', models.CharField(max_length=15)),
                ('nacionalidad', models.CharField(max_length=30)),
                ('municipio', models.CharField(max_length=50)),
                ('is_superuser', models.BooleanField(default=True)),
                ('is_active', models.BooleanField(default=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Aux_adm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_contrato', models.CharField(choices=[('1', 'Contrato a término indefinido'), ('2', 'Contrato a término fijo'), ('3', 'Contrato por obra o labor'), ('4', 'Contrato ocasional, accidental o transitorio'), ('5', 'Contrato de aprendizaje'), ('6', 'Contrato de prestación de servicios'), ('7', 'Contrato sindical ')], default='hola', max_length=100, verbose_name='Tipo de contrato')),
                ('fecha_ingreso', models.DateField(verbose_name='Fecha de ingreso')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Gerente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profesion', models.CharField(max_length=100)),
                ('sueldo', models.DecimalField(decimal_places=3, max_digits=10, verbose_name='sueldo')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Gestor_TH',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cargo', models.CharField(max_length=100, verbose_name='Cargo')),
                ('tipo_contrato', models.CharField(choices=[('1', 'Contrato a término indefinido'), ('2', 'Contrato a término fijo'), ('3', 'Contrato por obra o labor'), ('4', 'Contrato ocasional, accidental o transitorio'), ('5', 'Contrato de aprendizaje'), ('6', 'Contrato de prestación de servicios'), ('7', 'Contrato sindical ')], default='hola', max_length=100, verbose_name='Tipo de contrato')),
                ('area_responsable', models.CharField(max_length=100, verbose_name='Área responsable')),
                ('fecha_ingreso', models.DateField(verbose_name='Fecha de ingreso')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Medico',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('especialidad', models.CharField(max_length=100, null=True, verbose_name='Especialidad')),
                ('contrato', models.CharField(max_length=100, null=True, verbose_name='Contrato')),
                ('sueldo', models.DecimalField(decimal_places=3, max_digits=6, verbose_name='Sueldo')),
                ('activo', models.BooleanField(default=False)),
                ('cargo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='Gestor_Th.cargo')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Paciente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ocupacion', models.CharField(max_length=100, verbose_name='Ocupacion')),
                ('regimen', models.CharField(choices=[('RC', 'Régimen Contributivo'), ('RS', 'Régimen Subsidiado'), ('RE', 'Régimen Especial'), ('PA', 'Particular')], max_length=10)),
                ('estrato', models.CharField(choices=[('1', 'Estrato 1'), ('2', 'Estrato 2'), ('3', 'Estrato 3'), ('4', 'Estrato 4'), ('5', 'Estrato 5'), ('6', 'Estrato 6')], max_length=1, verbose_name='Estrato')),
                ('tipo_afiliacion', models.CharField(choices=[('COT', 'Cotizante'), ('BEN', 'Beneficiario'), ('ADI', 'Adicional'), ('NC', 'No Cotizante')], max_length=3, verbose_name='Tipo de Afiliación')),
                ('grupo_atencion_especial', models.CharField(choices=[('I', 'Indígena'), ('N', 'Negro'), ('D', 'Desplazado'), ('O', 'Otro')], max_length=1, verbose_name='Grupo de Atención Especial')),
                ('grupo_sanguineo', models.CharField(choices=[('A+', 'A Positivo'), ('A-', 'A Negativo'), ('B+', 'B Positivo'), ('B-', 'B Negativo'), ('AB+', 'AB Positivo'), ('AB-', 'AB Negativo'), ('O+', 'O Positivo'), ('O-', 'O Negativo')], max_length=3, verbose_name='RH')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
