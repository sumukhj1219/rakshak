import SetOwnerComponent from "@/components/setOwnerComponent";
import SetRecipientComponent from "@/components/setReciptentComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingItem
            title="Transfer Ownership"
            description="Change account ownership."
            component={<SetOwnerComponent />}
          />
          <SettingItem
            title="Set Recipient"
            description="Update recipient details."
            component={<SetRecipientComponent />}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function SettingItem({ title, description, component }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <div>
        <h2 className="text-sm font-medium text-gray-800">{title}</h2>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
      {component}
    </div>
  );
}

