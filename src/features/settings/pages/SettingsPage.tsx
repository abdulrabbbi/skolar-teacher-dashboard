
import { useState } from 'react';
import PageHeader from '../../../shared/components/ui/PageHeader';
import NotificationSettings from '../components/NotificationSettings';
import PreferenceSettings from '../components/PreferenceSettings';
import ProfileSettings from '../components/ProfileSettings';
import SettingsSidebar from '../components/SettingsSidebar';
import {
  notificationSettings,
  preferenceSettings,
  profileSettings,
  settingsTabs,
  type SettingsTab,
} from '../data/settings.mock';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <SettingsSidebar
          tabs={settingsTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div>
          {activeTab === 'profile' ? (
            <ProfileSettings profile={profileSettings} />
          ) : null}
          {activeTab === 'notifications' ? (
            <NotificationSettings items={notificationSettings} />
          ) : null}
          {activeTab === 'preferences' ? (
            <PreferenceSettings preferences={preferenceSettings} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
