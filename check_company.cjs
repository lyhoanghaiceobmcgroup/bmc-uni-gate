const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://blbgiudtlbbisotwummj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsYmdpdWR0bGJiaXNvdHd1bW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MzkwNzMsImV4cCI6MjA3MjExNTA3M30.Gr0WQkjE3ihI1D3qbadm_q_4pVYDKv1rWOGI1ZM4Aw0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCompany() {
  try {
    console.log('Đang kiểm tra công ty có mã số thuế: 0316461800...');
    
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('tax_code', '0316461800');
    
    if (error) {
      console.error('Lỗi khi truy vấn:', error);
      return;
    }
    
    if (data && data.length > 0) {
      console.log('\n✅ Tìm thấy công ty:');
      console.log('📋 Thông tin chi tiết:');
      data.forEach((company, index) => {
        console.log(`\n--- Công ty ${index + 1} ---`);
        console.log(`🏢 Tên: ${company.name}`);
        console.log(`🆔 ID: ${company.id}`);
        console.log(`📄 Mã số thuế: ${company.tax_code}`);
        console.log(`📊 Cấp độ: ${company.level}`);
        console.log(`🏭 Ngành nghề: ${company.industry}`);
        console.log(`💰 Vốn đầu tư: ${company.total_investment_value ? (company.total_investment_value / 1000000).toFixed(0) + 'M VNĐ' : 'N/A'}`);
        console.log(`📈 BMC sở hữu: ${company.bmc_equity_percentage}%`);
        console.log(`📅 Năm đầu tư: ${company.investment_year || 'N/A'}`);
        console.log(`📝 Mô tả: ${company.description || 'N/A'}`);
        console.log(`⏰ Ngày tạo: ${new Date(company.created_at).toLocaleString('vi-VN')}`);
      });
      
      // Kiểm tra xem có phải F1 không
      const f1Companies = data.filter(company => company.level === 'F1');
      if (f1Companies.length > 0) {
        console.log('\n🎯 Kết luận: Đây là công ty F1!');
      } else {
        console.log(`\n📍 Kết luận: Đây KHÔNG phải công ty F1. Cấp độ hiện tại: ${data[0].level}`);
      }
    } else {
      console.log('\n❌ Không tìm thấy công ty nào có mã số thuế: 0316461800');
      
      // Kiểm tra tất cả công ty F1 để so sánh
      console.log('\n🔍 Đang kiểm tra tất cả công ty F1 trong hệ thống...');
      const { data: f1Data, error: f1Error } = await supabase
        .from('organizations')
        .select('name, tax_code, level')
        .eq('level', 'F1');
      
      if (f1Error) {
        console.error('Lỗi khi truy vấn F1:', f1Error);
      } else if (f1Data && f1Data.length > 0) {
        console.log(`\n📊 Tìm thấy ${f1Data.length} công ty F1:`);
        f1Data.forEach((company, index) => {
          console.log(`${index + 1}. ${company.name} - MST: ${company.tax_code || 'N/A'}`);
        });
      } else {
        console.log('\n📭 Không có công ty F1 nào trong hệ thống.');
      }
    }
  } catch (err) {
    console.error('Lỗi không mong muốn:', err);
  }
}

checkCompany();