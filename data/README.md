# Hệ thống Quản lý Dữ liệu Báo cáo Công ty

## Cấu trúc Thư mục

Hệ thống được tổ chức theo cấu trúc 3 tầng:
```
data/
├── [Phòng ban]/
│   ├── [Tên Công ty 1]/
│   │   ├── daily_reports/
│   │   ├── financial_data/
│   │   ├── performance_metrics/
│   │   └── ...
│   ├── [Tên Công ty 2]/
│   └── ...
└── ...
```

## 13 Phòng ban Chính

1. **Phòng cổ đông** - Quản lý thông tin cổ đông và quan hệ nhà đầu tư
2. **Phòng kinh doanh** - Dữ liệu bán hàng và phát triển kinh doanh
3. **Phòng marketing** - Chiến dịch marketing và phân tích thị trường
4. **Phòng Tài chính** - Báo cáo tài chính và quản lý ngân sách
5. **Phòng Kế toán** - Sổ sách kế toán và báo cáo thuế
6. **Phòng Nhân sự** - Quản lý nhân viên và phúc lợi
7. **Phòng Đào tạo** - Chương trình đào tạo và phát triển năng lực
8. **Phòng sản xuất** - Dữ liệu sản xuất và quản lý chất lượng
9. **Phòng chiến lược** - Kế hoạch chiến lược và phân tích thị trường
10. **Phòng công nghệ** - Hạ tầng IT và phát triển công nghệ
11. **Phòng pháp chế** - Tuân thủ pháp luật và quản lý rủi ro
12. **Phòng Đầu tư vốn** - Quản lý đầu tư và phân bổ vốn
13. **Phòng kho vận** - Quản lý kho bãi và logistics

## Luồng Dữ liệu

### Công ty Báo cáo (Ghi dữ liệu)
- Công ty tạo và cập nhật dữ liệu hàng ngày
- Dữ liệu được lưu trong thư mục riêng của công ty
- Mỗi công ty có thư mục con trong từng phòng ban liên quan
- Cập nhật realtime theo từng ngày

### Phòng ban Đọc dữ liệu (Đọc dữ liệu)
- Các phòng ban truy cập dữ liệu từ tất cả công ty
- Tổng hợp và phân tích dữ liệu theo chuyên môn
- Tạo báo cáo tổng hợp cho ban lãnh đạo
- Theo dõi hiệu suất và xu hướng

## Quy trình Hoạt động

1. **Tạo công ty mới**: Tự động tạo thư mục công ty trong các phòng ban liên quan
2. **Báo cáo hàng ngày**: Công ty cập nhật dữ liệu vào thư mục của mình
3. **Đọc và phân tích**: Phòng ban truy cập dữ liệu để phân tích và báo cáo
4. **Tổng hợp**: Tạo báo cáo tổng hợp từ nhiều công ty
5. **Realtime sync**: Dữ liệu được đồng bộ realtime với hệ thống

## Lưu ý Kỹ thuật

- Dữ liệu được cập nhật realtime
- Mỗi công ty có quyền ghi vào thư mục riêng
- Phòng ban có quyền đọc từ tất cả thư mục công ty
- Backup tự động hàng ngày
- Log tracking cho mọi thay đổi dữ liệu