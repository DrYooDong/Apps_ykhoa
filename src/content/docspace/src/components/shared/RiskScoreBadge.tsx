import { ShieldAlert, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { ClinicalRiskScore } from '../../lib/riskScore.ts';

interface RiskScoreBadgeProps {
  riskScore: ClinicalRiskScore;
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RiskScoreBadge: React.FC<RiskScoreBadgeProps> = ({
  riskScore,
  showScore = true,
  size = 'md',
  className = '',
}) => {
  const getIcon = () => {
    switch (riskScore.level) {
      case 4:
        return <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />;
      case 3:
        return <AlertTriangle className="w-3.5 h-3.5" />;
      case 2:
        return <Info className="w-3.5 h-3.5" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5" />;
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 text-[11px]',
    lg: 'px-3 py-1 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded font-bold tracking-wide uppercase ${
        riskScore.color.badgeBg
      } ${riskScore.color.badgeText} shadow-2xs ${sizeClasses[size]} ${className}`}
    >
      {getIcon()}
      <span>{riskScore.levelName}</span>
      {showScore && (
        <span className="opacity-80 font-mono-custom font-normal lowercase">
          ({riskScore.totalScore} đ)
        </span>
      )}
    </span>
  );
};
