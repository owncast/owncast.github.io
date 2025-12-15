import React, { useState, useMemo } from 'react';
import styles from './ResourcesCalculator.module.css';

interface QualityOutput {
  bitrate: number;
  isPassthrough: boolean;
  frameRate: number;
}

interface CalculationResults {
  bandwidthGB: number;
  cpuCores: string;
  cpuLevel: string;
  viewerExperience: number;
  viewerExperienceText: string;
  recommendations: Recommendation[];
}

interface Recommendation {
  type: 'info' | 'warning' | 'danger';
  message: string;
}

const ResourcesCalculator: React.FC = () => {
  const [inputBitrate, setInputBitrate] = useState(5000);
  const [viewers, setViewers] = useState(25);
  const [duration, setDuration] = useState(2);
  const [qualities, setQualities] = useState<QualityOutput[]>([
    { bitrate: 5000, isPassthrough: true, frameRate: 30 },
    { bitrate: 1500, isPassthrough: false, frameRate: 30 },
  ]);
  const [useS3, setUseS3] = useState(false);
  const [editingQuality, setEditingQuality] = useState<{ index: number; quality: QualityOutput } | null>(null);
  const [showAddQuality, setShowAddQuality] = useState(false);

  const results = useMemo<CalculationResults>(() => {
    const durationSeconds = duration * 3600;
    const calculateBandwidth = (br: number, v: number): number => {
      // Convert kbps to GB total:
      // kbps * seconds = total kilobits
      // total kilobits / 8 = total kilobytes
      // total kilobytes / 1000000 = total gigabytes
      // Simplified: (kbps * seconds * viewers) / 8000000
      return (br * durationSeconds * v) / 8000000;
    };

    let bandwidthGB = 0;
    const sortedQualities = [...qualities].sort((a, b) => b.bitrate - a.bitrate);

    // Viewer distribution based on number of qualities
    const distributions = qualities.length === 1 ? [1.0] :
                         qualities.length === 2 ? [0.7, 0.3] :
                         [0.7, 0.2, 0.1];

    // Calculate bandwidth for each quality
    sortedQualities.forEach((quality, index) => {
      const distribution = distributions[index] || 0;
      const viewersForQuality = Math.round(viewers * distribution);
      // For passthrough qualities, use current input bitrate
      const effectiveBitrate = quality.isPassthrough ? inputBitrate : quality.bitrate;
      bandwidthGB += calculateBandwidth(effectiveBitrate, viewersForQuality);
    });

    if (useS3) {
      // With S3, server only uploads, not distributes to viewers
      // Server bandwidth = sum of all quality bitrates uploaded to S3
      // For passthrough qualities, use current input bitrate
      const totalUpload = qualities.reduce((sum, q) => {
        const effectiveBitrate = q.isPassthrough ? inputBitrate : q.bitrate;
        return sum + effectiveBitrate;
      }, 0);
      bandwidthGB = (totalUpload * durationSeconds) / 8000000;
    }

    // CPU calculation based on documentation
    // Uses scale: Minimal → Light → Moderate → Heavy
    let totalCpu = 0;

    qualities.forEach((quality) => {
      if (quality.isPassthrough) {
        // Passthrough: Minimal CPU (no transcoding)
        totalCpu += 0.4;
      } else {
        // Transcoded quality
        const compressionRatio = quality.bitrate / inputBitrate;
        let cpuForQuality = 0;

        if (compressionRatio >= 0.9) {
          // Light CPU (minimal transcoding, matches input)
          cpuForQuality = 0.6;
        } else if (compressionRatio >= 0.5) {
          // Moderate CPU (active encoding to reduce bitrate)
          cpuForQuality = 1.0;
        } else {
          // Heavy CPU (significant compression required)
          cpuForQuality = 1.3;
        }

        // Apply frame rate modifier
        // Lower frame rates reduce CPU usage
        const frameRateModifier = quality.frameRate / 30;
        cpuForQuality *= frameRateModifier;

        totalCpu += cpuForQuality;
      }
    });

    const cpuMin = totalCpu * 0.8;
    const cpuMax = totalCpu * 1.2;
    const cpuCores = cpuMin === cpuMax ? `${cpuMin.toFixed(1)}` : `${cpuMin.toFixed(1)}-${cpuMax.toFixed(1)}`;

    // Determine CPU level label based on total CPU usage
    let cpuLevel: string;
    if (cpuMax <= 0.5) {
      cpuLevel = 'Minimal';
    } else if (cpuMax <= 1.0) {
      cpuLevel = 'Light';
    } else if (cpuMax <= 2.0) {
      cpuLevel = 'Moderate';
    } else {
      cpuLevel = 'Heavy';
    }

    // Viewer experience based on available quality options
    // Fast stable: 65%, Fast fluctuating: 12%, Slow/mobile: 23%
    const fastStable = 0.65;
    const fastFluctuating = 0.12;
    const slowMobile = 0.23;

    const hasLowQuality = qualities.some(q => q.bitrate <= 2000);
    const hasMidQuality = qualities.some(q => q.bitrate > 2000 && q.bitrate <= 4000);
    const maxBitrate = Math.max(...qualities.map(q => q.bitrate));
    const minBitrate = Math.min(...qualities.map(q => q.bitrate));

    let goodExperience = 0;

    if (hasLowQuality) {
      // Has options for all viewer types
      goodExperience = 100;
    } else if (hasMidQuality) {
      // Has options for fast viewers but not slow mobile
      goodExperience = (fastStable + fastFluctuating) * 100;
    } else if (minBitrate <= 5500) {
      // High quality, but reasonable
      goodExperience = fastStable * 100;
    } else if (minBitrate <= 8000) {
      // Very high bitrate - only fastest connections
      goodExperience = 50;
    } else {
      // Extremely high bitrate (8000+) - very few can watch
      goodExperience = 35;
    }

    // Generate recommendations
    const recommendations: Recommendation[] = [];

    // High CPU warning
    if (cpuMax > 4) {
      recommendations.push({
        type: 'warning',
        message: 'High CPU usage detected. Consider reducing quality variants or lowering frame rates.',
      });
    }

    // Poor viewer experience
    if (goodExperience < 70) {
      const badExperiencePercent = 100 - goodExperience;
      let experienceText = '';

      if (badExperiencePercent >= 50) {
        experienceText = 'Many viewers';
      } else if (badExperiencePercent >= 30) {
        experienceText = 'Some viewers';
      } else if (badExperiencePercent >= 15) {
        experienceText = 'A few viewers';
      } else {
        experienceText = 'A small number of viewers';
      }

      recommendations.push({
        type: 'warning',
        message: `${experienceText} may experience buffering. Add a lower bitrate quality option for mobile and slower network viewers.`,
      });
    }

    // S3 recommendation
    if (!useS3 && viewers > 50) {
      recommendations.push({
        type: 'info',
        message: 'Consider using S3 storage to scale bandwidth with more viewers and reduce server load.',
      });
    }

    // Very high bitrate without low quality
    if (!hasLowQuality && maxBitrate > 6000) {
      recommendations.push({
        type: 'danger',
        message: 'High bitrate without low quality options will exclude viewers on mobile and slower networks. Add a quality variant below 2000 kbps.',
      });
    }

    // Single quality warning
    if (qualities.length === 1 && !qualities[0].isPassthrough && qualities[0].bitrate > 4000) {
      recommendations.push({
        type: 'warning',
        message: 'Single quality streams above 4000 kbps may cause buffering for viewers on mobile and slower networks. Add lower quality variants.',
      });
    }

    // Passthrough only with many viewers
    if (qualities.length === 1 && qualities[0].isPassthrough && viewers > 20) {
      recommendations.push({
        type: 'info',
        message: 'Passthrough mode saves CPU but may cause buffering for viewers on slower connections.',
      });
    }

    // High frame rate warning
    const hasHighFrameRate = qualities.some(q => !q.isPassthrough && q.frameRate >= 60);
    if (hasHighFrameRate && cpuMax > 3) {
      recommendations.push({
        type: 'info',
        message: 'High frame rates (60+ fps) significantly increase CPU usage. Consider lowering for non-gaming content.',
      });
    }

    // Very high frame rate warning
    const hasVeryHighFrameRate = qualities.some(q => !q.isPassthrough && q.frameRate >= 90);
    if (hasVeryHighFrameRate) {
      recommendations.push({
        type: 'warning',
        message: '90 fps requires substantial CPU resources. Only recommended for high-motion content with powerful hardware.',
      });
    }

    // Low frame rate suggestion for bandwidth savings
    const hasOnlyHighFrameRate = qualities.every(q => q.isPassthrough || q.frameRate >= 30);
    if (hasOnlyHighFrameRate && !hasLowQuality && cpuMax > 2) {
      recommendations.push({
        type: 'info',
        message: 'Consider adding a lower frame rate option (24 or 15 fps) to reduce CPU usage and improve experience for mobile and slower network viewers.',
      });
    }

    // Mixed frame rates optimization
    const frameRates = qualities.filter(q => !q.isPassthrough).map(q => q.frameRate);
    const uniqueFrameRates = new Set(frameRates);
    if (uniqueFrameRates.size === 1 && frameRates[0] >= 48 && qualities.length > 1) {
      recommendations.push({
        type: 'info',
        message: 'Lower quality variants could use reduced frame rates (24-30 fps) to save CPU while maintaining good experience.',
      });
    }

    // Convert viewer experience to text
    let viewerExperienceText = '';
    const roundedExperience = Math.round(goodExperience);

    if (roundedExperience >= 95) {
      viewerExperienceText = 'Excellent';
    } else if (roundedExperience >= 85) {
      viewerExperienceText = 'Very Good';
    } else if (roundedExperience >= 70) {
      viewerExperienceText = 'Good';
    } else if (roundedExperience >= 50) {
      viewerExperienceText = 'Fair';
    } else if (roundedExperience >= 30) {
      viewerExperienceText = 'Poor';
    } else {
      viewerExperienceText = 'Very Poor';
    }

    return {
      bandwidthGB: Math.round(bandwidthGB * 10) / 10,
      cpuCores,
      cpuLevel,
      viewerExperience: roundedExperience,
      viewerExperienceText,
      recommendations,
    };
  }, [inputBitrate, viewers, duration, qualities, useS3]);

  const saveQuality = (quality: QualityOutput) => {
    if (editingQuality !== null) {
      setQualities(prev => prev.map((q, i) => i === editingQuality.index ? quality : q));
      setEditingQuality(null);
    } else if (showAddQuality) {
      setQualities([...qualities, quality]);
      setShowAddQuality(false);
    }
  };

  const removeQuality = (index: number) => {
    if (qualities.length > 1) {
      setQualities(qualities.filter((_, i) => i !== index));
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>Input Bitrate: <strong>{inputBitrate}</strong> kbps</label>
          <input
            type="range"
            min="1000"
            max="13000"
            step="500"
            value={inputBitrate}
            onChange={(e) => setInputBitrate(parseInt(e.target.value))}
          />
        </div>

        <div className={styles.controlGroup}>
          <label>Viewers: <strong>{viewers}</strong></label>
          <input
            type="range"
            min="5"
            max="200"
            step="5"
            value={viewers}
            onChange={(e) => setViewers(parseInt(e.target.value))}
          />
        </div>

        <div className={styles.controlGroup}>
          <label>Duration: <strong>{duration}h</strong></label>
          <input
            type="range"
            min="0.5"
            max="6"
            step="0.5"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={useS3}
              onChange={(e) => setUseS3(e.target.checked)}
            />
            Using S3 Storage
          </label>
        </div>

        <div className={styles.qualitiesDisplay}>
          <div className={styles.qualitiesLabel}>Output Qualities:</div>
          <div className={styles.qualityChips}>
            {qualities.map((quality, index) => (
              <div key={index} className={styles.qualityChip}>
                <span onClick={() => setEditingQuality({ index, quality })} className={styles.qualityChipText}>
                  {quality.isPassthrough ? `${inputBitrate}` : quality.bitrate}k {quality.isPassthrough && '(PT)'}
                </span>
                {qualities.length > 1 && (
                  <button onClick={() => removeQuality(index)} className={styles.chipRemove}>×</button>
                )}
              </div>
            ))}
            {qualities.length < 3 && (
              <button onClick={() => setShowAddQuality(true)} className={styles.addChip}>+</button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.results}>
        <div className={styles.metricsRow}>
          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>Bandwidth</div>
            <div className={styles.metricValue}>{results.bandwidthGB} GB</div>
          </div>

          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>CPU</div>
            <div className={styles.metricValue}>{results.cpuLevel}</div>
          </div>

          <div className={styles.metricItem}>
            <div className={styles.metricLabel}>Experience</div>
            <div className={styles.metricValue}>{results.viewerExperienceText}</div>
          </div>
        </div>

        <div className={styles.recommendationsBox}>
          <div className={styles.recommendationsTitle}>Recommendations</div>
          {results.recommendations.length > 0 ? (
            <div className={styles.recommendationsList}>
              {results.recommendations.map((rec, index) => (
                <div key={index} className={`${styles.recommendation} ${styles[rec.type]}`}>
                  <span className={styles.recIcon}>
                    {rec.type === 'danger' ? '⚠️' : rec.type === 'warning' ? '⚡' : 'ℹ️'}
                  </span>
                  {rec.message}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noRecommendations}>
              <span className={styles.checkmark}>✓</span>
              No recommendations
            </div>
          )}
        </div>
      </div>

      {(editingQuality || showAddQuality) && (
        <QualityEditor
          initialQuality={editingQuality?.quality || { bitrate: 1500, isPassthrough: false, frameRate: 30 }}
          inputBitrate={inputBitrate}
          onSave={saveQuality}
          onCancel={() => {
            setEditingQuality(null);
            setShowAddQuality(false);
          }}
        />
      )}
    </div>
  );
};

interface QualityEditorProps {
  initialQuality: QualityOutput;
  inputBitrate: number;
  onSave: (quality: QualityOutput) => void;
  onCancel: () => void;
}

const QualityEditor: React.FC<QualityEditorProps> = ({ initialQuality, inputBitrate, onSave, onCancel }) => {
  const [bitrate, setBitrate] = useState(initialQuality.bitrate);
  const [isPassthrough, setIsPassthrough] = useState(initialQuality.isPassthrough);
  const [frameRate, setFrameRate] = useState(initialQuality.frameRate);

  return (
    <div className={styles.modal} onClick={onCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Configure Quality Output</h3>

        <div className={styles.modalField}>
          <label>
            <input
              type="checkbox"
              checked={isPassthrough}
              onChange={(e) => {
                setIsPassthrough(e.target.checked);
                if (e.target.checked) {
                  setBitrate(inputBitrate);
                }
              }}
            />
            Video Passthrough
          </label>
        </div>

        {!isPassthrough && (
          <>
            <div className={styles.modalField}>
              <label>Output Bitrate: <strong>{bitrate}</strong> kbps</label>
              <input
                type="range"
                min="500"
                max="13000"
                step="100"
                value={bitrate}
                onChange={(e) => setBitrate(parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>

            <div className={styles.modalField}>
              <label>Frame Rate: <strong>{frameRate}</strong> fps</label>
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={[10, 15, 24, 30, 48, 60, 90].indexOf(frameRate)}
                onChange={(e) => {
                  const rates = [10, 15, 24, 30, 48, 60, 90];
                  setFrameRate(rates[parseInt(e.target.value)]);
                }}
                className={styles.slider}
                list="frameRates"
              />
              <datalist id="frameRates">
                <option value="0" label="10"></option>
                <option value="1" label="15"></option>
                <option value="2" label="24"></option>
                <option value="3" label="30"></option>
                <option value="4" label="48"></option>
                <option value="5" label="60"></option>
                <option value="6" label="90"></option>
              </datalist>
            </div>
          </>
        )}

        {isPassthrough && (
          <div className={styles.modalInfo}>
            Bitrate will match input: <strong>{inputBitrate} kbps</strong>
            <br />
            Frame rate will match input stream
          </div>
        )}

        <div className={styles.modalButtons}>
          <button
            onClick={() => onSave({
              bitrate: isPassthrough ? inputBitrate : bitrate,
              isPassthrough,
              frameRate
            })}
            className={styles.saveBtn}
          >
            Save
          </button>
          <button onClick={onCancel} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesCalculator;
