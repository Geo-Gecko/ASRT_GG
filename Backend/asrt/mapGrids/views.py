from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
import psycopg2
from rest_framework.response import Response


@api_view(['GET'])
def view(request):
        # establishing a connection
    connection = psycopg2.connect(user = "postgres",
                                    password = "lambtex",
                                    host = "127.0.0.1",
                                    port = "5432",
                                    database = "project_taco_db")
        # creating the cursor (vessel to the db)
    cursor=connection.cursor()
        # executing the query
    cursor.execute("select id, rsd_id, gs_id from project_taco_schema.geometric_structure where rsd_id=1")

    rows=cursor.fetchall()
    cursor.close()
    connection.close()
    return Response({"data": rows})