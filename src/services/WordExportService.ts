import { MarketingReportData, SalesReportData } from '@/hooks/useSupabase';

export class WordExportService {
  static async exportMarketingReport(reportData: MarketingReportData): Promise<void> {
    try {
      // Create Word document content
      const content = this.generateMarketingWordContent(reportData);
      
      // Create blob and download
      const blob = new Blob([content], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `BaoCao_Marketing_${reportData.campaign_name}_${reportData.report_date}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting marketing report:', error);
      throw new Error('Không thể xuất báo cáo Word');
    }
  }

  static async exportSalesReport(reportData: SalesReportData): Promise<void> {
    try {
      // Create Word document content
      const content = this.generateSalesWordContent(reportData);
      
      // Create blob and download
      const blob = new Blob([content], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `BaoCao_KinhDoanh_${reportData.project}_${reportData.report_date}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting sales report:', error);
      throw new Error('Không thể xuất báo cáo Word');
    }
  }

  private static generateMarketingWordContent(data: MarketingReportData): string {
    return `
BÁO CÁO MARKETING – CÁ NHÂN

Ngày: ${new Date(data.report_date).toLocaleDateString('vi-VN')}
Người báo cáo: ${data.reporter} – ${data.role}
Dự án/Công ty: ${data.project}

1. THÔNG TIN CHIẾN DỊCH:
- Tên chiến dịch: ${data.campaign_name}
- Thời gian: ${new Date(data.campaign_start_date).toLocaleDateString('vi-VN')} – ${new Date(data.campaign_end_date).toLocaleDateString('vi-VN')}
- Kênh triển khai: ${data.channels.join(', ')}
- Ngân sách dự kiến: ${data.planned_budget.toLocaleString('vi-VN')} VNĐ
- Ngân sách đã chi: ${data.spent_budget.toLocaleString('vi-VN')} VNĐ

2. KẾT QUẢ CHIẾN DỊCH:
- Impressions: ${data.impressions.toLocaleString('vi-VN')}
- Clicks: ${data.clicks.toLocaleString('vi-VN')} (CTR = ${data.ctr}%)
- Leads thu được: ${data.leads.toLocaleString('vi-VN')}
- Conversion: ${data.conversions.toLocaleString('vi-VN')} khách hàng
- CPA: ${data.cpa.toLocaleString('vi-VN')} VNĐ
- ROI: ${data.roi}%

3. PHÂN TÍCH & GHI CHÚ:
- Điểm mạnh: ${data.strengths}
- Vấn đề: ${data.issues}
- Đề xuất: ${data.improvements}

4. TÀI LIỆU ĐÍNH KÈM:
${data.attachments.map(file => `- ${file}`).join('\n')}

Kết thúc:
Người báo cáo: ${data.reporter}
Ngày: ${new Date().toLocaleDateString('vi-VN')}
`;
  }

  private static generateSalesWordContent(data: SalesReportData): string {
    return `
BÁO CÁO KINH DOANH – CÁ NHÂN

Ngày: ${new Date(data.report_date).toLocaleDateString('vi-VN')}
Người báo cáo: ${data.reporter} – ${data.role}
Dự án/Công ty: ${data.project}

1. THÔNG TIN CHUNG:
- Phòng ban: ${data.department}
- Doanh thu ngày: ${data.daily_revenue.toLocaleString('vi-VN')} VNĐ
- Hợp đồng ký: ${data.contracts_signed}
- Khách hàng mới: ${data.new_customers}
- Khách hàng follow-up: ${data.follow_up_customers}
- Giá trị trung bình/khách hàng: ${data.avg_customer_value.toLocaleString('vi-VN')} VNĐ

2. HOẠT ĐỘNG TRONG NGÀY:
- Gọi điện thoại: ${data.phone_calls ? 'Có' : 'Không'}
- Gặp mặt trực tiếp: ${data.direct_meetings ? 'Có' : 'Không'}
- Demo sản phẩm: ${data.product_demos ? 'Có' : 'Không'}

3. GHI CHÚ CHI TIẾT:
${data.detailed_notes}

4. TÌNH TRẠNG CÔNG VIỆC:
- Trạng thái: ${data.work_status === 'completed' ? 'Hoàn thành' : data.work_status === 'in-progress' ? 'Đang thực hiện' : 'Chậm tiến độ'}
${data.delay_reason ? `- Lý do chậm: ${data.delay_reason}` : ''}

5. TÀI LIỆU ĐÍNH KÈM:
${data.attachments.map(file => `- ${file}`).join('\n')}

Kết thúc:
Người báo cáo: ${data.reporter}
Ngày: ${new Date().toLocaleDateString('vi-VN')}
`;
  }
}

export default WordExportService;