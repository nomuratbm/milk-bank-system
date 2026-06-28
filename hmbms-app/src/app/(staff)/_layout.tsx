/**
 * (staff)/_layout.tsx
 * --------------------
 * Layout wrapper for all staff screens.
 * Renders the DatabaseProvider + custom bottom nav bar.
 *
 * Nav bar style matches the app design:
 * - Background = activeProgram.color
 * - Active tab  = white circle that floats above the bar
 * - Inactive    = dark icon, no highlight
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { DatabaseProvider, useDatabase } from '../../contexts/DatabaseContext';

// ── SVG Icon Components ───────────────────────────────────────

function HomeIcon({ color, size = 26 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 42 42" fill="none">
      <Path
        d="M5.25 15.75L21 3.5L36.75 15.75V35C36.75 35.9283 36.3813 36.8185 35.7249 37.4749C35.0685 38.1313 34.1783 38.5 33.25 38.5H8.75C7.82174 38.5 6.9315 38.1313 6.27513 37.4749C5.61875 36.8185 5.25 35.9283 5.25 35V15.75Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M15.75 38.5V21H26.25V38.5"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function HeartIcon({ color, size = 26 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 38 38" fill="none">
      <Path
        d="M7.04689 22.0214L18.3153 32.6069C18.6398 32.9116 18.802 33.064 19 33.064C19.198 33.064 19.3602 32.9116 19.6847 32.6069L19.6847 32.6069L30.9531 22.0214C34.0504 19.1118 34.4265 14.3238 31.8215 10.9663L31.3317 10.335C28.2154 6.31846 21.9602 6.99207 19.7705 11.58C19.4612 12.2281 18.5387 12.2281 18.2294 11.58C16.0397 6.99207 9.78455 6.31846 6.66828 10.335L6.17846 10.9663C3.57349 14.3238 3.94961 19.1118 7.04689 22.0214Z"
        stroke={color}
        strokeWidth="2"
      />
    </Svg>
  );
}

function PinIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <Path
        d="M22.6358 5.40949C23.2888 4.97412 23.6153 4.75643 23.9711 4.79166C24.3269 4.82689 24.6044 5.10439 25.1594 5.65938L30.3406 10.8406C30.8956 11.3956 31.1731 11.6731 31.2083 12.0289C31.2436 12.3847 31.0259 12.7112 30.5905 13.3642L27.2557 18.3664C26.3807 19.679 25.9431 20.3353 25.6432 21.0593C25.3433 21.7834 25.1886 22.5568 24.8793 24.1037L24.4489 26.2557C24.3153 26.9234 24.2486 27.2572 24.0854 27.4526C23.8712 27.709 23.5432 27.8415 23.2111 27.8058C22.958 27.7786 22.6781 27.5848 22.1182 27.1972C19.491 25.3784 18.1774 24.469 16.9598 23.4514C15.361 22.1152 13.8848 20.639 12.5486 19.0402C11.531 17.8226 10.6216 16.509 8.80276 13.8818C8.41519 13.3219 8.2214 13.042 8.19421 12.7889C8.15853 12.4568 8.29104 12.1288 8.5474 11.9146C8.74276 11.7514 9.0766 11.6847 9.74427 11.5511L11.8963 11.1207C13.4432 10.8114 14.2166 10.6567 14.9407 10.3568C15.6647 10.0569 16.321 9.61932 17.6336 8.74426L22.6358 5.40949Z"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M7.5 28.5L14.25 21.75"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function ReportsIcon({ color, size = 26 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Rect
        x="8.33334"
        y="6.66663"
        width="23.3333"
        height="28.3333"
        rx="2"
        stroke={color}
        strokeWidth="2"
      />
      <Path d="M15 15H25" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M15 21.6666H25" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M15 28.3334H21.6667" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

// ── Nav item config ───────────────────────────────────────────
const NAV_ITEMS = [
  { key: 'home', route: '/(staff)/home', Icon: HomeIcon },
  { key: 'registry', route: '/(staff)/registry', Icon: HeartIcon },
  { key: 'tracker', route: '/(staff)/tracker', Icon: PinIcon },
  { key: 'reports', route: '/(staff)/reports', Icon: ReportsIcon },
] as const;

// ── Inner layout ──────────────────────────────────────────────
function StaffLayoutInner() {
  const router = useRouter();
  const pathname = usePathname();
  const { activeProgram } = useDatabase();

  const programColor = activeProgram?.color ?? '#F5C518';

  // Derive active tab from current path
  const activeKey =
    pathname.includes('/home') ? 'home'
      : pathname.includes('/registry') ? 'registry'
        : pathname.includes('/tracker') ? 'tracker'
          : pathname.includes('/reports') ? 'reports'
            : 'home';

  const ICON_COLOR_ACTIVE = '#1A1040'; // dark ink — sits on white bubble
  const ICON_COLOR_INACTIVE = '#1A1040'; // same dark ink on program-colored bar

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Slot />
      </View>

      {/* ── Bottom Nav Bar ── */}
      <View style={[styles.navBar, { backgroundColor: programColor }]}>
        {NAV_ITEMS.map(({ key, route, Icon }) => {
          const isActive = activeKey === key;
          return (
            <TouchableOpacity
              key={key}
              style={styles.navItem}
              onPress={() => router.push(route as any)}
              activeOpacity={0.7}
            >
              {isActive ? (
                /*
                 * Active state: white circle that rises above the bar.
                 * The negative marginTop pulls it upward.
                 */
                <View style={[styles.activeBubble, { borderColor: programColor }]}>
                  <Icon color={ICON_COLOR_ACTIVE} size={24} />
                </View>
              ) : (
                <Icon color={ICON_COLOR_INACTIVE} size={24} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ── Outer layout ──────────────────────────────────────────────
export default function StaffLayout() {
  return (
    <DatabaseProvider>
      <StaffLayoutInner />
    </DatabaseProvider>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0D072F',
  },
  content: {
    flex: 1,
  },

  navBar: {
    flexDirection: 'row',
    // backgroundColor set dynamically to activeProgram.color
    paddingBottom: 16,
    paddingTop: 10,
    paddingHorizontal: 8,
    height: 74,
    alignItems: 'center',
    // No rounded top — matches the screenshots (flat top edge)
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /**
   * White circle that floats above the nav bar.
   * - Negative marginTop lifts it so roughly half the circle
   *   sits above the bar's top edge, exactly like the screenshots.
   * - borderColor matches the program color so it blends with the bar.
   */
  activeBubble: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32,          // lift above the bar
    borderWidth: 3,
    // borderColor set inline to programColor
    // Subtle shadow so it reads as elevated
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 6,
  },
});