import { useNavigate, useLocation } from "react-router-dom";
import { InvestmentCapitalDetailView } from "@/components/erp/views/InvestmentCapitalDetailView";

const InvestmentCapitalDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get investment data from navigation state
  const investmentData = location.state?.investmentData;
  const source = location.state?.source;
  const mode = location.state?.mode;
  
  const handleBack = () => {
    // Navigate back to the source page
    if (source === 'ecosystem-portfolio') {
      navigate('/');
    } else {
      navigate(-1);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <InvestmentCapitalDetailView 
        onBack={handleBack}
        investmentData={investmentData}
        mode={mode}
      />
    </div>
  );
};

export default InvestmentCapitalDetail;