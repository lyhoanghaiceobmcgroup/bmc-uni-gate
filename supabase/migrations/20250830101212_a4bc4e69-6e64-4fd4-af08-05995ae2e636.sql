-- Create BMC Group organization at F1 level (100% BMC ownership)
INSERT INTO public.organizations (
  id,
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
  gen_random_uuid(),
  'BMC Group Corporation',
  'BMC-F0-001',
  'F1', -- Using F1 as the highest available level for now
  'Tập đoàn đầu tư đa ngành',
  ARRAY['Đầu tư chiến lược', 'Quản lý danh mục', 'Tư vấn doanh nghiệp'],
  100, -- BMC owns 100%
  0, -- Parent company
  2024,
  'Tập đoàn BMC - Công ty mẹ quản lý toàn bộ hệ sinh thái từ F5 đến F1',
  'active'
) ON CONFLICT DO NOTHING;