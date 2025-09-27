from rest_framework.pagination import PageNumberPagination


class CustomPaginations(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'limit'
    max_page_size = 100


class CustomModelPaginations(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'limit'
    max_page_size = 100
