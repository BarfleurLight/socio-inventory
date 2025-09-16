import csv
from io import TextIOWrapper
from rest_framework.exceptions import ValidationError


def process_csv_file(request):
    if 'file' not in request.FILES:
        raise ValidationError("CSV файл не предоставлен")
    
    file = request.FILES['file']
    
    try:
        decoded_file = TextIOWrapper(file, encoding='utf-8')
        reader = csv.DictReader(decoded_file, delimiter=';')
        return list(reader)
    except Exception as e:
        raise ValidationError(f"Ошибка обработки CSV файла: {str(e)}")