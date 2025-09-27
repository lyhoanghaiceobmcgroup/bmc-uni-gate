import {
  ShieldCheck,
  Server,
  Router,
  Network,
  Cloud,
  Headset,
  Truck,
  Building2,
  PhoneCall,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Globe,
  Zap,
  Shield,
  Database,
  Cable,
  Lock,
} from "lucide-react";

const productHighlights = [
  {
    title: "Máy chủ & Trung tâm dữ liệu",
    description:
      "Giải pháp máy chủ hiệu năng cao với khả năng mở rộng linh hoạt cho mọi doanh nghiệp.",
    icon: Server,
    tags: ["Rack Server", "Blade Server", "Hệ thống lưu trữ"],
  },
  {
    title: "Thiết bị mạng doanh nghiệp",
    description:
      "Switch Layer 2/3, router và firewall thế hệ mới với khả năng bảo mật tích hợp.",
    icon: Router,
    tags: ["Switch PoE", "Router SD-WAN", "Firewall UTM"],
  },
  {
    title: "Hạ tầng điện & dự phòng",
    description:
      "Tối ưu nguồn điện với UPS, hệ thống giám sát và giải pháp dự phòng tự động.",
    icon: Zap,
    tags: ["UPS Online", "PDU thông minh", "Máy phát dự phòng"],
  },
];

const featuredSolutions = [
  {
    name: "Data Center All-In-One",
    price: "Từ 480.000.000đ",
    description:
      "Trọn bộ hạ tầng trung tâm dữ liệu bao gồm rack, hệ thống làm mát, giám sát và quản lý.",
    features: ["Tối ưu không gian", "Chuẩn Tier III", "Triển khai trong 30 ngày"],
  },
  {
    name: "Campus Network 10G",
    price: "Từ 260.000.000đ",
    description:
      "Thiết kế mạng cho khối văn phòng với băng thông 10Gbps, quản lý tập trung, bảo mật đa lớp.",
    features: ["Wi-Fi 6", "SDN Controller", "Tường lửa thế hệ mới"],
  },
  {
    name: "Cloud Edge Hybrid",
    price: "Từ 350.000.000đ",
    description:
      "Hợp nhất hạ tầng tại chỗ và đám mây với khả năng mở rộng linh hoạt theo nhu cầu thực tế.",
    features: ["Kết nối đa đám mây", "Giám sát chủ động", "Tối ưu chi phí vận hành"],
  },
];

const supportServices = [
  {
    icon: Headset,
    title: "Tư vấn 24/7",
    description:
      "Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ đánh giá hiện trạng và tư vấn giải pháp phù hợp.",
  },
  {
    icon: Wrench,
    title: "Triển khai & bảo trì",
    description:
      "Triển khai tận nơi, đào tạo vận hành và bảo trì định kỳ theo tiêu chuẩn quốc tế.",
  },
  {
    icon: Truck,
    title: "Hậu cần toàn quốc",
    description:
      "Giao hàng, lắp đặt và bảo hành tại 63 tỉnh thành với kho dự phòng linh kiện.",
  },
];

const trustedPartners = [
  "Cisco",
  "Dell Technologies",
  "Fortinet",
  "HPE",
  "Juniper",
  "Veeam",
  "VMware",
  "Microsoft",
];

const TechInfrastructureStore = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-slate-900 to-slate-950" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 py-20 md:flex-row md:items-center md:gap-24 lg:py-28">
          <div className="md:w-1/2">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-200">
              <Shield className="h-4 w-4" /> Hạ tầng công nghệ toàn diện
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Giải pháp hạ tầng công nghệ cho doanh nghiệp chuyển đổi số
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              Nâng cấp hệ thống CNTT với danh mục sản phẩm, dịch vụ chuyên sâu và đội ngũ kỹ sư đạt chứng chỉ quốc tế. Tối ưu vận hành, đảm bảo an toàn dữ liệu và mở rộng linh hoạt cho mọi mô hình doanh nghiệp.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
              >
                Khám phá sản phẩm
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#consulting"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-blue-400 hover:text-blue-200"
              >
                Đặt lịch tư vấn
              </a>
            </div>
            <dl className="mt-12 grid grid-cols-1 gap-6 text-sm text-slate-300 sm:grid-cols-3">
              <div>
                <dt className="font-semibold text-white">15+</dt>
                <dd>năm triển khai hạ tầng</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">1200+</dt>
                <dd>dự án Data Center & Campus</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">ISO 27001</dt>
                <dd>chứng nhận an toàn thông tin</dd>
              </div>
            </dl>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-3xl border border-blue-500/20 bg-white/5 p-6 backdrop-blur">
              <div className="absolute -top-10 -left-10 hidden h-32 w-32 rounded-full bg-blue-500/20 blur-3xl sm:block" />
              <div className="absolute -bottom-12 -right-12 hidden h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl sm:block" />
              <div className="relative grid gap-6">
                <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-blue-500/20 p-3">
                      <Server className="h-8 w-8 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Data Center Edge</h3>
                      <p className="text-sm text-slate-400">Hạ tầng micro data center cho chi nhánh.</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4 text-xs text-slate-300">
                    <div className="rounded-lg border border-slate-700/60 bg-slate-900/80 p-3">
                      <span className="font-semibold text-white">+45%</span>
                      <p>Tăng hiệu suất</p>
                    </div>
                    <div className="rounded-lg border border-slate-700/60 bg-slate-900/80 p-3">
                      <span className="font-semibold text-white">99.99%</span>
                      <p>Độ sẵn sàng</p>
                    </div>
                    <div className="rounded-lg border border-slate-700/60 bg-slate-900/80 p-3">
                      <span className="font-semibold text-white">Tier III</span>
                      <p>Chuẩn quốc tế</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-6 w-6 text-emerald-300" />
                      <p className="text-sm font-semibold text-white">Bảo mật đa lớp</p>
                    </div>
                    <p className="mt-3 text-xs text-slate-400">
                      Tích hợp SOC, SIEM và hệ thống phát hiện xâm nhập chủ động.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5">
                    <div className="flex items-center gap-3">
                      <Cloud className="h-6 w-6 text-sky-300" />
                      <p className="text-sm font-semibold text-white">Hybrid-ready</p>
                    </div>
                    <p className="mt-3 text-xs text-slate-400">
                      Kết nối liền mạch với AWS, Azure và Google Cloud thông qua SD-WAN.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5">
                  <div className="flex items-center gap-3">
                    <Database className="h-6 w-6 text-purple-300" />
                    <p className="text-sm font-semibold text-white">Sao lưu thông minh</p>
                  </div>
                  <p className="mt-3 text-xs text-slate-400">
                    Quản lý backup đa nền tảng, phục hồi chỉ trong 15 phút với automation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-24 px-6 py-20" id="products">
        <section className="space-y-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white">Danh mục sản phẩm chủ đạo</h2>
              <p className="mt-3 max-w-3xl text-slate-300">
                Lựa chọn các thiết bị hạ tầng công nghệ đáp ứng tiêu chuẩn doanh nghiệp với hiệu năng cao, dễ mở rộng và bảo mật tối đa.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Cam kết hàng chính hãng, bảo hành tận nơi.
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {productHighlights.map((product) => (
              <article
                key={product.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                  <product.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{product.title}</h3>
                <p className="mt-3 text-sm text-slate-400">{product.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-700/80 bg-slate-800/60 px-3 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-slate-900 to-slate-950 p-10" id="solutions">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-100">
                <Building2 className="h-3.5 w-3.5" /> Gói giải pháp triển khai nhanh
              </span>
              <h2 className="text-3xl font-semibold text-white">Giải pháp tích hợp theo yêu cầu doanh nghiệp</h2>
              <p className="text-slate-300">
                Chúng tôi thiết kế giải pháp toàn diện, từ khảo sát, tư vấn đến triển khai và vận hành, đảm bảo hệ thống hoạt động ổn định, an toàn.
              </p>
            </div>
            <a
              href="#consulting"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Nhận báo giá chi tiết
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredSolutions.map((solution) => (
              <div
                key={solution.name}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-lg shadow-blue-900/20"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold text-white">{solution.name}</h3>
                  <span className="text-sm font-medium text-blue-200">{solution.price}</span>
                </div>
                <p className="mt-3 text-sm text-slate-400">{solution.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-300">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[3fr_2fr]" id="consulting">
          <div className="space-y-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
            <div className="flex items-center gap-3">
              <PhoneCall className="h-6 w-6 text-blue-300" />
              <h2 className="text-2xl font-semibold text-white">Đặt lịch tư vấn & khảo sát miễn phí</h2>
            </div>
            <p className="text-sm text-slate-300">
              Để lại thông tin, chúng tôi sẽ liên hệ trong vòng 24 giờ để khảo sát nhu cầu, lên phương án và báo giá chi tiết cho doanh nghiệp của bạn.
            </p>
            <form className="grid gap-4 text-sm text-slate-900">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-slate-200">
                  Họ và tên
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-slate-200">
                  Email công việc
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="contact@company.vn"
                  className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-slate-200">
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="0909 000 000"
                  className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="need" className="text-slate-200">
                  Nhu cầu triển khai
                </label>
                <textarea
                  id="need"
                  rows={4}
                  placeholder="Mô tả dự án, quy mô người dùng, yêu cầu đặc thù..."
                  className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
              >
                Gửi yêu cầu tư vấn
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
          <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
            <div className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-6">
              <div className="flex items-center gap-3 text-slate-200">
                <Lock className="h-5 w-5 text-amber-300" />
                <p className="text-sm font-semibold">An toàn & bảo mật</p>
              </div>
              <p className="mt-3 text-sm text-slate-400">
                Mọi thông tin khách hàng được bảo mật theo chuẩn GDPR & ISO 27001.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-6">
              <div className="flex items-center gap-3 text-slate-200">
                <Globe className="h-5 w-5 text-sky-300" />
                <p className="text-sm font-semibold">Phạm vi phục vụ</p>
              </div>
              <p className="mt-3 text-sm text-slate-400">
                Hỗ trợ triển khai tại Việt Nam và khu vực Đông Nam Á với đội ngũ bản địa.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-6">
              <div className="flex items-center gap-3 text-slate-200">
                <Cable className="h-5 w-5 text-purple-300" />
                <p className="text-sm font-semibold">Hạ tầng đồng bộ</p>
              </div>
              <p className="mt-3 text-sm text-slate-400">
                Cam kết thiết bị chính hãng, đồng bộ từ phần cứng đến phần mềm quản trị.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                <Network className="h-3.5 w-3.5" /> Dịch vụ đi kèm
              </span>
              <h2 className="text-3xl font-semibold text-white">Dịch vụ hỗ trợ chuyên sâu</h2>
              <p className="text-slate-300">
                Đội ngũ kỹ sư chứng chỉ CCIE, HCIE, AWS Solutions Architect đảm bảo hệ thống vận hành 24/7 với SLA lên đến 99.99%.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {supportServices.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-slate-800/70 bg-slate-950/60 p-6"
                >
                  <service.icon className="h-8 w-8 text-blue-300" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white">Đối tác công nghệ chiến lược</h2>
              <p className="mt-3 max-w-2xl text-slate-300">
                Hợp tác cùng các nhà sản xuất hàng đầu để mang đến giải pháp tối ưu và dịch vụ bảo hành toàn diện cho khách hàng.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-300 sm:grid-cols-4">
              {trustedPartners.map((partner) => (
                <span
                  key={partner}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-center font-semibold"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/60 bg-slate-950/80 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-white">BMC Tech Infrastructure</p>
            <p>Đối tác chuyển đổi số tin cậy của doanh nghiệp Việt.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-blue-300" /> 1900 6868
            </div>
            <div className="flex items-center gap-2">
              <Headset className="h-4 w-4 text-blue-300" /> support@bmcgate.vn
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-300" /> 45A Nguyễn Thị Minh Khai, Q1, TP.HCM
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechInfrastructureStore;
