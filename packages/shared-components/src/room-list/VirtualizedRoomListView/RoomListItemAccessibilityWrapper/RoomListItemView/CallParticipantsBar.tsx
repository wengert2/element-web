/*
 * Copyright 2026 Element Creations Ltd.
 *
 * SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
 * Please see LICENSE files in the repository root for full details.
 */

import React from "react";
import { Avatar, Text } from "@vector-im/compound-web";

import { type CallParticipant } from "./RoomListItemView";
import styles from "./CallParticipantsBar.module.css";
import { _t } from "../../../../core/i18n/i18n";

const MAX_VISIBLE_PARTICIPANTS = 10;

interface CallParticipantsBarProps {
    participants: CallParticipant[];
}

/**
 * Renders a vertical list of call participants with avatar and name per row.
 * Similar to Discord's voice channel participant display.
 * Designed to support future microphone activity indicators via CallParticipant.isSpeaking/isMuted.
 */
export const CallParticipantsBar: React.FC<CallParticipantsBarProps> = ({ participants }) => {
    if (participants.length === 0) return null;

    const visibleParticipants = participants.slice(0, MAX_VISIBLE_PARTICIPANTS);
    const overflowCount = participants.length - MAX_VISIBLE_PARTICIPANTS;

    return (
        <div className={styles.callParticipantsBar} aria-hidden={true}>
            {visibleParticipants.map((participant) => (
                <div
                    key={participant.id}
                    className={styles.participantRow}
                    title={participant.name}
                >
                    <Avatar
                        size="16px"
                        name={participant.name}
                        id={participant.id}
                        src={participant.avatarUrl}
                    />
                    <Text
                        as="span"
                        size="sm"
                        className={styles.participantName}
                    >
                        {participant.name}
                    </Text>
                </div>
            ))}
            {overflowCount > 0 && (
                <div className={styles.overflowRow}>
                    <Text size="sm" className={styles.overflowText}>
                        {_t("room_list|call|more_participants", { count: overflowCount })}
                    </Text>
                </div>
            )}
        </div>
    );
};
