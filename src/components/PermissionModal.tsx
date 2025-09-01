import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlertTriangle, User, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";

interface PermissionModalProps {
  module: {
    id: string;
    name: string;
    icon: any;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ module, open, onOpenChange }) => {
  const [requestType, setRequestType] = useState("");
  const [reason, setReason] = useState("");
  const [scope, setScope] = useState("");

  const handleSubmit = () => {
    // Handle permission request submission
    console.log("Permission request submitted:", { module: module.id, requestType, reason, scope });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <module.icon className="w-5 h-5 text-primary" />
            <span>Yêu cầu quyền truy cập: {module.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Status */}
          <Card className="p-4 border-orange-200 bg-orange-50/50">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <div>
                <p className="font-medium text-orange-800">Chưa có quyền truy cập</p>
                <p className="text-sm text-orange-600">Bạn chỉ có thể xem demo UI. Gửi yêu cầu để được cấp quyền thao tác.</p>
              </div>
            </div>
          </Card>

          {/* Request Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="request-type">Loại quyền yêu cầu</Label>
              <Select value={requestType} onValueChange={setRequestType}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại quyền cần thiết" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="read">Chỉ xem (Read-only)</SelectItem>
                  <SelectItem value="edit">Chỉnh sửa (Edit)</SelectItem>
                  <SelectItem value="create">Tạo mới (Create)</SelectItem>
                  <SelectItem value="approve">Duyệt/Phê duyệt (Approve)</SelectItem>
                  <SelectItem value="execute">Thực thi hành động (Execute)</SelectItem>
                  <SelectItem value="admin">Quản trị (Admin)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="scope">Phạm vi áp dụng</Label>
              <Input
                id="scope"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                placeholder="VD: Chi nhánh Hà Nội, Dự án P-RAN-35NBK, Số tiền ≤ 50 triệu"
              />
            </div>

            <div>
              <Label htmlFor="reason">Lý do yêu cầu</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Mô tả chi tiết lý do cần quyền này và mục đích sử dụng..."
                rows={4}
              />
            </div>
          </div>

          {/* Approval Flow */}
          <div className="space-y-3">
            <Label>Quy trình phê duyệt</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">1</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Trưởng phòng Kế toán</p>
                  <p className="text-xs text-muted-foreground">Nguyễn Thị Hoa - CFO</p>
                </div>
                <Badge variant="outline" className="text-xs">Chờ duyệt</Badge>
              </div>

              <div className="flex items-center space-x-3 p-2 bg-muted/20 rounded-lg opacity-60">
                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">2</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Admin chính</p>
                  <p className="text-xs text-muted-foreground">Phòng IT - Tập đoàn</p>
                </div>
                <Badge variant="outline" className="text-xs opacity-60">Chưa đến lượt</Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!requestType || !reason}
            >
              Gửi yêu cầu
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionModal;