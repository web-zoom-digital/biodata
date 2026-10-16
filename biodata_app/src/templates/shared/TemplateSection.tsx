import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import type { ResolvedSection } from '@/types/biodata';
import { FONT_DISPLAY } from './constants';

export interface SectionStyles {
  wrapper?: ViewStyle;
  title?: TextStyle;
  row?: ViewStyle;
  label?: TextStyle;
  colon?: TextStyle;
  value?: TextStyle;
  text?: TextStyle;
  rowLayout?: 'inline' | 'stacked';
  labelWidth?: number;
  showColon?: boolean;
  renderTitle?: (title: string, style?: TextStyle) => React.ReactNode;
}

export const TemplateSection: React.FC<{
  section: ResolvedSection;
  styles?: SectionStyles;
}> = ({ section, styles = {} }) => {
  const { rowLayout = 'inline', labelWidth = 112, showColon = true } = styles;

  const validRows = section.rows.filter(
    (row) => row && typeof row.value === 'string' && row.value.trim().length > 0
  );
  const hasText = Boolean(section.text && section.text.trim().length > 0);

  // If section has no valid rows and no text, do not render it
  if (validRows.length === 0 && !hasText) {
    return null;
  }

  return (
    <View style={[defaultStyles.wrapper, styles.wrapper]}>
      {/* Title */}
      <View style={defaultStyles.titleContainer}>
        {styles.renderTitle ? (
          styles.renderTitle(section.title, styles.title)
        ) : (
          <Text style={[defaultStyles.title, styles.title]}>{section.title}</Text>
        )}
      </View>

      {/* Rows */}
      {validRows.map((row, i) => (
        <View
          key={`${row.label}-${i}`}
          style={[
            defaultStyles.row,
            rowLayout === 'inline' ? defaultStyles.rowInline : defaultStyles.rowStacked,
            styles.row,
          ]}
        >
          <Text
            style={[
              defaultStyles.label,
              rowLayout === 'inline' ? { width: labelWidth } : null,
              styles.label,
            ]}
            numberOfLines={1}
          >
            {row.label}
          </Text>
          {rowLayout === 'inline' && showColon ? (
            <Text style={[defaultStyles.colon, styles.colon]}>:</Text>
          ) : null}
          <Text style={[defaultStyles.value, styles.value]} numberOfLines={2}>
            {row.value}
          </Text>
        </View>
      ))}

      {/* Text paragraph (About Me, Expectations) */}
      {hasText ? (
        <Text style={[defaultStyles.text, styles.text]} numberOfLines={5}>
          {section.text}
        </Text>
      ) : null}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  titleContainer: {
    marginBottom: 3,
  },
  title: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: FONT_DISPLAY,
  },
  row: {
    paddingVertical: 1.6,
  },
  rowInline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  rowStacked: {
    flexDirection: 'column',
    gap: 1.5,
  },
  label: {
    fontSize: 9.5,
    color: '#64748B',
    fontWeight: '500',
  },
  colon: {
    width: 10,
    fontSize: 9.5,
    color: '#94A3B8',
    fontWeight: '600',
    textAlign: 'center',
  },
  value: {
    flex: 1,
    fontSize: 9.8,
    color: '#1E293B',
    fontWeight: '600',
    lineHeight: 14,
  },
  text: {
    fontSize: 9.2,
    lineHeight: 14,
    color: '#334155',
    marginTop: 2,
  },
});
