import React from 'react';
import { QuickActionButton } from './QuickActionButton.tsx';

export const QuickActions: React.FC = () => {
  return (
    <aside className="self-stretch my-auto w-full max-md:mt-10">
      <QuickActionButton
        icon="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/99abba9ed4041cad851cacd7b7537c4f370b7e62?placeholderIfAbsent=true"
        text="OPEN MAP VIEW"
        iconAlt="Map icon"
      />

      <div className="mt-3">
        <QuickActionButton
          icon="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/6c0debc93da17ce60b1f704669a9a861146a1710?placeholderIfAbsent=true"
          text="SEE STATISTICS"
          iconAlt="Statistics icon"
        />
      </div>

      <div className="mt-2.5">
        <QuickActionButton
          icon="https://cdn.builder.io/api/v1/image/assets/dc2319f83b3a42a8a7d7e21e5b5256f0/104bd14d9b66e6716bc316e5964f36b9f36fa9aa?placeholderIfAbsent=true"
          text="REFER A FRIEND"
          iconAlt="Referral icon"
        />
      </div>
    </aside>
  );
};
