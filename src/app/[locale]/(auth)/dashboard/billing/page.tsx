export default function Billing() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Billing & Budget</h1>
      
      {/* TODO: Current usage and costs */}
      {/* TODO: Budget management */}
      {/* TODO: Billing history */}
      {/* TODO: Payment methods */}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Current Usage</h2>
          <div className="text-gray-500">TODO: Current month usage and costs</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Budget Alerts</h2>
          <div className="text-gray-500">TODO: Budget limits and notifications</div>
        </div>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">TODO: Billing Features</h2>
        <ul className="space-y-2">
          <li>• Real-time usage tracking</li>
          <li>• Budget limits and alerts</li>
          <li>• Detailed billing history</li>
          <li>• Cost breakdown by project/job</li>
          <li>• Payment method management</li>
          <li>• Invoice generation</li>
          <li>• Usage forecasting</li>
        </ul>
      </div>
    </div>
  );
}
