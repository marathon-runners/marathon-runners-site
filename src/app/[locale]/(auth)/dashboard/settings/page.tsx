export default function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      {/* TODO: User profile settings */}
      {/* TODO: API keys management */}
      {/* TODO: Notification preferences */}
      {/* TODO: Security settings */}

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="text-gray-500">TODO: User profile information</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">API Keys</h2>
          <div className="text-gray-500">TODO: API key management</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="text-gray-500">TODO: Notification preferences</div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">TODO: Settings Features</h2>
        <ul className="space-y-2">
          <li>• User profile management</li>
          <li>• API key generation and management</li>
          <li>• Notification preferences</li>
          <li>• Security settings (2FA, etc.)</li>
          <li>• Team/organization management</li>
          <li>• Integration settings</li>
        </ul>
      </div>
    </div>
  );
}
