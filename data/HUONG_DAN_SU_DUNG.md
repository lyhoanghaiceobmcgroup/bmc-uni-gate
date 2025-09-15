# Hướng Dẫn Sử Dụng Hệ Thống Báo Cáo

## Dành cho CÔNG TY (Ghi dữ liệu)

### Quy trình báo cáo hàng ngày:

1. **Truy cập thư mục công ty**
   ```
   data/[Tên Phòng ban]/[Tên Công ty của bạn]/
   ```

2. **Tạo/Cập nhật file báo cáo**
   - Tài chính: `daily_financial_report.json`
   - Nhân sự: `hr_daily_report.json`
   - Kinh doanh: `sales_daily_report.json`
   - Marketing: `marketing_daily_report.json`
   - Sản xuất: `production_daily_report.json`

3. **Định dạng dữ liệu**
   - Sử dụng format JSON
   - Bao gồm: company_name, report_date, department
   - Cập nhật timestamp: created_at, updated_at

4. **Lưu ý quan trọng**
   - Cập nhật hàng ngày trước 18:00
   - Đảm bảo dữ liệu chính xác
   - Backup dữ liệu định kỳ

### Ví dụ cấu trúc file:
```json
{
  "company_name": "Tên công ty",
  "report_date": "2025-01-09",
  "department": "Tên phòng ban",
  "data": {
    // Dữ liệu cụ thể theo phòng ban
  },
  "created_at": "2025-01-09T08:00:00Z",
  "updated_at": "2025-01-09T17:30:00Z"
}
```

---

## Dành cho PHÒNG BAN (Đọc dữ liệu)

### Quy trình đọc và phân tích dữ liệu:

1. **Truy cập dữ liệu phòng ban**
   ```
   data/[Tên Phòng ban của bạn]/
   ```

2. **Đọc dữ liệu từ tất cả công ty**
   - Duyệt qua tất cả thư mục công ty
   - Đọc file báo cáo mới nhất
   - Tổng hợp dữ liệu theo ngày/tuần/tháng

3. **Phân tích và báo cáo**
   - So sánh hiệu suất giữa các công ty
   - Tính toán KPI trung bình
   - Xác định xu hướng và pattern
   - Tạo dashboard tổng hợp

4. **Tạo báo cáo tổng hợp**
   - Báo cáo hàng ngày cho ban lãnh đạo
   - Phân tích xu hướng hàng tuần
   - Đánh giá hiệu suất hàng tháng

### Script đọc dữ liệu mẫu (Python):
```python
import json
import os
from datetime import datetime

def read_department_data(department_name):
    department_path = f"data/{department_name}"
    all_reports = []
    
    for company_folder in os.listdir(department_path):
        company_path = os.path.join(department_path, company_folder)
        if os.path.isdir(company_path):
            # Đọc tất cả file JSON trong thư mục công ty
            for file_name in os.listdir(company_path):
                if file_name.endswith('.json'):
                    file_path = os.path.join(company_path, file_name)
                    with open(file_path, 'r', encoding='utf-8') as f:
                        report_data = json.load(f)
                        all_reports.append(report_data)
    
    return all_reports

# Sử dụng
finance_reports = read_department_data("Phòng Tài chính")
hr_reports = read_department_data("Phòng Nhân sự")
```

### Quyền truy cập:
- **Công ty**: Chỉ ghi vào thư mục riêng của mình
- **Phòng ban**: Đọc từ tất cả thư mục công ty trong phòng ban
- **Ban lãnh đạo**: Đọc từ tất cả phòng ban

### Lịch trình báo cáo:
- **Hàng ngày**: 18:30 - Tổng hợp dữ liệu ngày
- **Hàng tuần**: Thứ 2 - Báo cáo xu hướng tuần
- **Hàng tháng**: Ngày 1 - Đánh giá hiệu suất tháng

### Hỗ trợ kỹ thuật:
- Email: support@company.com
- Hotline: 1900-xxxx
- Tài liệu API: /docs/api-reference.md