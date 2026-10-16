import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, ViewProps, StyleProp, ViewStyle } from 'react-native';

// 1. Extend ViewProps to automatically inherit standard container attributes
interface CardProps extends ViewProps {
  title?: string;
  description?: string;
  headerActions?: ReactNode; // Elements on the right side of the header (e.g., buttons, icons)
  footer?: ReactNode;        // Dedicated footer area
  variant?: 'default' | 'outlined' | 'shadow'; // Visual presets
  contentStyle?: StyleProp<ViewStyle>;         // Optional overrides for the inner content block
}

export const Card = ({
  title,
  description,
  headerActions,
  footer,
  variant = 'default',
  children,
  style,          // External container styles passed by the consumer
  contentStyle,   // Styles specifically for the child wrapper
  ...viewProps    // Captures all other standard View props (onLayout, pointerEvents, testID, etc.)
}: CardProps) => {

  // Select base preset styles based on the chosen variant
  const variantStyle = styles[variant];

  return (
    <View 
      style={[styles.container, variantStyle, style]} 
      {...viewProps} // Automatically attaches forwarded native layout configurations
    >
      {/* Header Section */}
      {(title || description || headerActions) && (
        <View style={styles.headerRow}>
          <View style={styles.headerTextContainer}>
            {title && <Text style={styles.title}>{title}</Text>}
            {description && <Text style={styles.description}>{description}</Text>}
          </View>
          {headerActions && <View style={styles.actions}>{headerActions}</View>}
        </View>
      )}

      {/* Main Content Area */}
      <View style={[styles.content, contentStyle, style]}>
        {children}
      </View>

      {/* Footer Section */}
      {footer && (
        <View style={styles.footerRow}>
          {footer}
        </View>
      )}
    </View>
  );
};

// 2. Optimized Stylesheet
const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  // Variants
  default: {
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  outlined: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: 'transparent',
  },
  shadow: {
    // Cross-platform shadows
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3, // Android shadow
  },
  // Layout Structural Pieces
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    fontSize: 14,
    color: '#374151',
    borderRadius: 12,
  },
  footerRow: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});