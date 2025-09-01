import { SalesReportData } from '../hooks/useSupabase';

// Word export utility for standardized sales reports
export interface WordExportOptions {
  template?: 'standard' | 'detailed';
  includeAttachments?: boolean;
  logoUrl?: string;
}

export class WordExportService {
  private static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  private static formatDate(date: string): string {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  private static getWorkStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'in_progress': return 'Đang xử lý';
      case 'delayed': return 'Trì hoãn';
      default: return 'Không xác định';
    }
  }

  private static calculateCompletionPercentage(data: SalesReportData): number {
    const totalTasks = 3; // Based on work status options
    const completedWeight = data.workStatus === 'completed' ? 1 : 0;
    const inProgressWeight = data.workStatus === 'in_progress' ? 0.5 : 0;
    return Math.round((completedWeight + inProgressWeight) * 100);
  }

  public static generateWordContent(data: SalesReportData, options: WordExportOptions = {}): string {
    const { template = 'standard', includeAttachments = true } = options;
    
    const completionPercentage = this.calculateCompletionPercentage(data);
    const formattedDate = this.formatDate(data.reportDate);
    const workStatusText = this.getWorkStatusText(data.workStatus);

    const wordContent = `
BÁO CÁO KINH DOANH – CÁ NHÂN

Ngày: ${formattedDate}
Người báo cáo: ${data.reporterName} – ${data.role}
Dự án/Công ty: ${data.project}
Phòng ban: ${data.department}

═══════════════════════════════════════════════════════════════

1. THÔNG TIN CHUNG
   • Ngày báo cáo: ${formattedDate}
   • Dự án/Công ty: ${data.project}
   • Phòng ban: ${data.department}
   • Người báo cáo: ${data.reporterName}
   • Vai trò: ${data.role}

2. CHỈ SỐ KINH DOANH
   • Doanh thu hôm nay: ${this.formatCurrency(data.dailyRevenue)}
   • Hợp đồng ký: ${data.contractsSigned}
   • Khách hàng mới: ${data.newCustomers}
   • Khách hàng follow-up: ${data.followUpCustomers}
   • Giá trị TB/khách hàng: ${this.formatCurrency(data.averageCustomerValue)}

3. HOẠT ĐỘNG THỰC HIỆN
   • Gọi điện: ${data.phoneCalls} khách hàng
   • Gặp trực tiếp: ${data.meetings} khách hàng
   • Demo sản phẩm: ${data.demos} lần
   • Ghi chú chi tiết: ${data.notes || 'Không có ghi chú'}

4. TÌNH TRẠNG CÔNG VIỆC
   • Trạng thái: ${workStatusText}
   • Tỷ lệ hoàn thành: ${completionPercentage}%
   ${data.workStatus === 'delayed' && data.delayReason ? `• Lý do trì hoãn: ${data.delayReason}` : ''}

${includeAttachments && data.attachments && data.attachments.length > 0 ? `
5. TÀI LIỆU ĐÍNH KÈM
${data.attachments.map((file, index) => `   • ${file.name} (${file.type})`).join('\n')}
` : ''}

═══════════════════════════════════════════════════════════════

Kết thúc báo cáo

Người báo cáo: ${data.reporterName}
Ngày tạo: ${formattedDate}
Thời gian tạo: ${new Date().toLocaleTimeString('vi-VN')}

---
Báo cáo được tạo tự động bởi hệ thống ERP-AI
© ${new Date().getFullYear()} BMC Uni-Gate System
`;

    return wordContent;
  }

  public static async exportToWord(data: SalesReportData, options: WordExportOptions = {}): Promise<void> {
    try {
      const content = this.generateWordContent(data, options);
      const fileName = `BaoCaoKinhDoanh_${data.reporterName.replace(/\s+/g, '')}_${data.reportDate.replace(/-/g, '')}.txt`;
      
      // Create blob and download
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Simulate email sending (in real implementation, this would call an API)
      console.log(`📧 Báo cáo đã được gửi về email: ${data.reporterName.toLowerCase().replace(/\s+/g, '.')}@company.com`);
      console.log(`📁 File đã được lưu: ${fileName}`);
      
    } catch (error) {
      console.error('Lỗi khi xuất báo cáo Word:', error);
      throw new Error('Không thể xuất báo cáo Word. Vui lòng thử lại.');
    }
  }

  // Advanced Word export with proper .docx format (requires additional library)
  public static async exportToDocx(data: SalesReportData, options: WordExportOptions = {}): Promise<void> {
    // This would require a library like 'docx' or 'pizzip' + 'docxtemplater'
    // For now, we'll use the text export as a placeholder
    console.log('🚧 Tính năng xuất .docx đang được phát triển...');
    console.log('📄 Sử dụng xuất text format thay thế.');
    
    await this.exportToWord(data, options);
  }

  // Generate email content for report submission
  public static generateEmailContent(data: SalesReportData): { subject: string; body: string } {
    const formattedDate = this.formatDate(data.reportDate);
    
    return {
      subject: `[Báo cáo KD] ${data.reporterName} - ${formattedDate}`,
      body: `
Kính gửi Ban lãnh đạo,

Tôi xin gửi báo cáo kinh doanh cá nhân ngày ${formattedDate}:

📊 Tóm tắt kết quả:
• Doanh thu: ${this.formatCurrency(data.dailyRevenue)}
• Hợp đồng ký: ${data.contractsSigned}
• Khách hàng mới: ${data.newCustomers}
• Khách hàng follow-up: ${data.followUpCustomers}

📋 Hoạt động chính:
• Gọi điện: ${data.phoneCalls} KH
• Gặp trực tiếp: ${data.meetings} KH
• Demo: ${data.demos} lần

Báo cáo chi tiết đính kèm.

Trân trọng,
${data.reporterName}
${data.role} - ${data.department}
      `
    };
  }
}

// Export default instance
export default WordExportService;