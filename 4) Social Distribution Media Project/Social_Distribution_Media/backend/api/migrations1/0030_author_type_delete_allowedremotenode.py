# Generated by Django 4.1.7 on 2023-03-19 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_remove_allowedremotenode_detail_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='type',
            field=models.CharField(default='author', max_length=15),
        )
    ]
