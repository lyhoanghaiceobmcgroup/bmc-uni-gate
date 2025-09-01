import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, ArrowRight, MapPin, TrendingUp, Users, Building2, Target, DollarSign, Calendar, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GlobalExpansion = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                ← Về trang chủ
              </Button>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold">BMC Global Expansion</h1>
              </div>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Target className="w-3 h-3 mr-1" />
              Strategic Initiative 2025
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-destructive bg-clip-text text-transparent">
              Mở Rộng Toàn Cầu
            </h1>
            <p className="text-xl text-muted-foreground">
              Chiến lược mở rộng BMC Holdings ra 15+ thị trường quốc tế trong 3 năm tới
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge variant="secondary">🌏 15+ Markets</Badge>
              <Badge variant="secondary">💰 $2.5B Investment</Badge>
              <Badge variant="secondary">🏢 500+ New Locations</Badge>
              <Badge variant="secondary">👥 25,000+ Jobs</Badge>
            </div>
          </div>
        </section>

        {/* Current Global Presence */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            Hiện Tại Có Mặt Tại
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-card border-primary/20">
              <div className="text-center space-y-3">
                <div className="text-3xl">🇻🇳</div>
                <h3 className="font-semibold">Vietnam</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>233 công ty</p>
                  <p>6,850 nhân viên</p>
                  <p>Revenue: 891B VNĐ</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-accent/20">
              <div className="text-center space-y-3">
                <div className="text-3xl">🇹🇭</div>
                <h3 className="font-semibold">Thailand</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>45 chi nhánh</p>
                  <p>1,200 nhân viên</p>
                  <p>Revenue: 180B VNĐ</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-destructive/20">
              <div className="text-center space-y-3">
                <div className="text-3xl">🇸🇬</div>
                <h3 className="font-semibold">Singapore</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>12 văn phòng</p>
                  <p>340 nhân viên</p>
                  <p>Revenue: 95B VNĐ</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-foreground/20">
              <div className="text-center space-y-3">
                <div className="text-3xl">🇲🇾</div>
                <h3 className="font-semibold">Malaysia</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>8 chi nhánh</p>
                  <p>280 nhân viên</p>
                  <p>Revenue: 44B VNĐ</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Expansion Timeline */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-accent" />
            Timeline Mở Rộng 2025-2027
          </h2>
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card border-primary/20">
              <div className="flex items-start gap-4">
                <Badge variant="default" className="bg-primary">2025 Q1-Q2</Badge>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Phase 1: Southeast Asia Expansion</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">🇮🇩 Indonesia</p>
                      <p className="text-muted-foreground">Jakarta, Surabaya, Bandung</p>
                    </div>
                    <div>
                      <p className="font-medium">🇵🇭 Philippines</p>
                      <p className="text-muted-foreground">Manila, Cebu, Davao</p>
                    </div>
                    <div>
                      <p className="font-medium">🇰🇭 Cambodia</p>
                      <p className="text-muted-foreground">Phnom Penh, Siem Reap</p>
                    </div>
                  </div>
                  <p className="mt-3 text-primary font-medium">Investment: $450M • Expected Jobs: 3,500</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-accent/20">
              <div className="flex items-start gap-4">
                <Badge variant="secondary" className="bg-accent">2025 Q3-Q4</Badge>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Phase 2: East Asia Markets</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">🇰🇷 South Korea</p>
                      <p className="text-muted-foreground">Seoul, Busan, Incheon</p>
                    </div>
                    <div>
                      <p className="font-medium">🇯🇵 Japan</p>
                      <p className="text-muted-foreground">Tokyo, Osaka, Nagoya</p>
                    </div>
                    <div>
                      <p className="font-medium">🇹🇼 Taiwan</p>
                      <p className="text-muted-foreground">Taipei, Taichung</p>
                    </div>
                  </div>
                  <p className="mt-3 text-accent font-medium">Investment: $680M • Expected Jobs: 4,200</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-destructive/20">
              <div className="flex items-start gap-4">
                <Badge variant="destructive">2026-2027</Badge>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Phase 3: Global Markets</h3>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium">🇦🇺 Australia</p>
                      <p className="text-muted-foreground">Sydney, Melbourne</p>
                    </div>
                    <div>
                      <p className="font-medium">🇺🇸 USA</p>
                      <p className="text-muted-foreground">California, Texas</p>
                    </div>
                    <div>
                      <p className="font-medium">🇬🇧 UK</p>
                      <p className="text-muted-foreground">London, Manchester</p>
                    </div>
                    <div>
                      <p className="font-medium">🇨🇦 Canada</p>
                      <p className="text-muted-foreground">Toronto, Vancouver</p>
                    </div>
                  </div>
                  <p className="mt-3 text-destructive font-medium">Investment: $1.37B • Expected Jobs: 17,300</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Business Clusters Expansion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-destructive" />
            Mở Rộng Theo Cluster
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-card border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">F&B Cluster</h3>
                  <Badge variant="outline" className="text-xs">Priority 1</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Current Markets</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Markets</span>
                    <span className="font-medium text-primary">+8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investment</span>
                    <span className="font-medium">$890M</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex gap-1 text-xs">
                    <Badge variant="secondary">Restaurants</Badge>
                    <Badge variant="secondary">Cafes</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-accent/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Tech Cluster</h3>
                  <Badge variant="outline" className="text-xs">Priority 1</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Current Markets</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Markets</span>
                    <span className="font-medium text-accent">+12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investment</span>
                    <span className="font-medium">$1.2B</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex gap-1 text-xs flex-wrap">
                    <Badge variant="secondary">AI/ML</Badge>
                    <Badge variant="secondary">Fintech</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-destructive/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Jewelry (GAJ)</h3>
                  <Badge variant="outline" className="text-xs">Priority 2</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Current Markets</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Markets</span>
                    <span className="font-medium text-destructive">+6</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investment</span>
                    <span className="font-medium">$320M</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex gap-1 text-xs">
                    <Badge variant="secondary">Luxury</Badge>
                    <Badge variant="secondary">Retail</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-foreground/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Education</h3>
                  <Badge variant="outline" className="text-xs">Priority 3</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Current Markets</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Markets</span>
                    <span className="font-medium text-foreground">+5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investment</span>
                    <span className="font-medium">$160M</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex gap-1 text-xs">
                    <Badge variant="secondary">K-12</Badge>
                    <Badge variant="secondary">Vocational</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Strategic Goals */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Mục Tiêu Chiến Lược
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-card border-primary/20">
              <div className="text-center space-y-4">
                <DollarSign className="w-12 h-12 text-primary mx-auto" />
                <h3 className="font-semibold text-lg">Revenue Target</h3>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-primary">$8.5B</p>
                  <p className="text-sm text-muted-foreground">By 2027 (từ $3.2B hiện tại)</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-accent/20">
              <div className="text-center space-y-4">
                <Users className="w-12 h-12 text-accent mx-auto" />
                <h3 className="font-semibold text-lg">Employment</h3>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-accent">32,000+</p>
                  <p className="text-sm text-muted-foreground">Tổng nhân viên toàn cầu</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-destructive/20">
              <div className="text-center space-y-4">
                <TrendingUp className="w-12 h-12 text-destructive mx-auto" />
                <h3 className="font-semibold text-lg">Market Share</h3>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-destructive">Top 3</p>
                  <p className="text-sm text-muted-foreground">Trong mỗi thị trường mục tiêu</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-accent" />
            Metrics & KPIs
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-gradient-card border-primary/20">
              <h3 className="font-semibold text-lg mb-4">Financial KPIs</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>ROI Target</span>
                  <span className="font-medium text-primary">25%+</span>
                </div>
                <div className="flex justify-between">
                  <span>Payback Period</span>
                  <span className="font-medium">3.2 years</span>
                </div>
                <div className="flex justify-between">
                  <span>EBITDA Margin</span>
                  <span className="font-medium text-primary">18%+</span>
                </div>
                <div className="flex justify-between">
                  <span>Market Entry Cost</span>
                  <span className="font-medium">$15M avg</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-accent/20">
              <h3 className="font-semibold text-lg mb-4">Operational KPIs</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Time to Market</span>
                  <span className="font-medium text-accent">6-8 months</span>
                </div>
                <div className="flex justify-between">
                  <span>Local Compliance</span>
                  <span className="font-medium">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cultural Integration</span>
                  <span className="font-medium text-accent">95%+</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer Satisfaction</span>
                  <span className="font-medium">4.5/5</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-destructive/5 rounded-xl border border-primary/10">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Sẵn Sàng Mở Rộng Toàn Cầu</h2>
            <p className="text-muted-foreground">
              Tham gia cùng BMC Holdings trong hành trình chinh phục 15+ thị trường quốc tế
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="min-w-[200px]">
                <Target className="w-4 h-4 mr-2" />
                Xem Chi Tiết Kế Hoạch
              </Button>
              <Button variant="outline" size="lg" className="min-w-[200px]">
                <ArrowRight className="w-4 h-4 mr-2" />
                Đăng Ký Tham Gia
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GlobalExpansion;