import React from "react";
import Badge, { BadgeVariant } from "./Badge";
import Button from "./Button";

export type PatientStatus = "active" | "inactive" | "critical" | "discharged" | "scheduled";

export interface PatientHeaderProps {
  name: string;
  age: number;
  sex: "Male" | "Female" | "Other" | string;
  patientId: string;
  lastVisit?: string;
  status?: PatientStatus;
  avatarUrl?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  className?: string;
}

const statusConfig: Record<
  PatientStatus,
  { label: string; variant: BadgeVariant; dot: boolean }
> = {
  active: { label: "Active", variant: "success", dot: true },
  inactive: { label: "Inactive", variant: "neutral", dot: true },
  critical: { label: "Critical", variant: "error", dot: true },
  discharged: { label: "Discharged", variant: "neutral", dot: false },
  scheduled: { label: "Scheduled", variant: "primary", dot: true },
};

const AvatarInitials: React.FC<{ name: string }> = ({ name }) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className="w-12 h-12 rounded-full bg-[#f5e6ff] border-2 border-[#d199ff] flex items-center justify-center flex-shrink-0"
      aria-hidden="true"
    >
      <span className="text-[16px] font-semibold text-[#a20eff]">{initials}</span>
    </div>
  );
};

export const PatientHeader: React.FC<PatientHeaderProps> = ({
  name,
  age,
  sex,
  patientId,
  lastVisit,
  status = "active",
  avatarUrl,
  onPrimaryAction,
  onSecondaryAction,
  primaryActionLabel = "Open Record",
  secondaryActionLabel = "Schedule Visit",
  className = "",
}) => {
  const statusInfo = statusConfig[status];

  return (
    <div
      className={[
        "bg-white border border-[#e1e1e1] rounded-[16px] p-6",
        "shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
        "flex items-center justify-between gap-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="region"
      aria-label={`Patient: ${name}`}
    >
      {/* Left — identity */}
      <div className="flex items-center gap-4 min-w-0">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${name} avatar`}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-[#e1e1e1]"
          />
        ) : (
          <AvatarInitials name={name} />
        )}

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-[24px] leading-[32px] font-semibold text-[#000000] truncate">
              {name}
            </h2>
            <Badge variant={statusInfo.variant} dot={statusInfo.dot}>
              {statusInfo.label}
            </Badge>
          </div>

          <dl className="flex items-center gap-3 mt-1 flex-wrap">
            <div className="flex items-center gap-1">
              <dt className="text-[12px] leading-[16px] font-semibold text-[#777777] uppercase tracking-wide">
                Age
              </dt>
              <dd className="text-[14px] leading-[20px] text-[#333333]">{age}</dd>
            </div>
            <span className="text-[#e1e1e1]" aria-hidden="true">·</span>
            <div className="flex items-center gap-1">
              <dt className="text-[12px] leading-[16px] font-semibold text-[#777777] uppercase tracking-wide">
                Sex
              </dt>
              <dd className="text-[14px] leading-[20px] text-[#333333]">{sex}</dd>
            </div>
            <span className="text-[#e1e1e1]" aria-hidden="true">·</span>
            <div className="flex items-center gap-1">
              <dt className="text-[12px] leading-[16px] font-semibold text-[#777777] uppercase tracking-wide">
                ID
              </dt>
              <dd className="text-[14px] leading-[20px] font-mono text-[#333333]">{patientId}</dd>
            </div>
            {lastVisit && (
              <>
                <span className="text-[#e1e1e1]" aria-hidden="true">·</span>
                <div className="flex items-center gap-1">
                  <dt className="text-[12px] leading-[16px] font-semibold text-[#777777] uppercase tracking-wide">
                    Last Visit
                  </dt>
                  <dd className="text-[14px] leading-[20px] text-[#333333]">{lastVisit}</dd>
                </div>
              </>
            )}
          </dl>
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {onSecondaryAction && (
          <Button variant="outline" size="md" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        )}
        {onPrimaryAction && (
          <Button variant="primary" size="md" onClick={onPrimaryAction}>
            {primaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PatientHeader;
