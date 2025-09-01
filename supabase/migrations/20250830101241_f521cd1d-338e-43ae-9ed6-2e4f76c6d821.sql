-- Create BMC Group organization at F0/F1 level (100% BMC ownership)
-- This represents the parent corporation that owns all other entities

INSERT INTO public.organizations (
  name,
  code, 
  level,
  industry,
  main_products,
  bmc_equity_percentage,
  total_investment_value,
  investment_year,
  description,
  status
) VALUES (
  'BMC Group Corporation',
  'BMC-GROUP-001',
  'F1', -- Using F1 as the highest available level
  'Tập đoàn đầu tư đa ngành',
  ARRAY['Đầu tư chiến lược', 'Quản lý danh mục', 'Tư vấn doanh nghiệp', 'Công nghệ AI-ERP'],
  100, -- BMC owns 100%
  0, -- Parent company - no external investment
  2024,
  'Tập đoàn BMC - Công ty mẹ quản lý toàn bộ hệ sinh thái đầu tư từ F5 (Startup) đến F1 (Cụm ngành). Đây là tầng tập đoàn với quyền sở hữu 100%.',
  'active'
) ON CONFLICT (code) DO NOTHING;