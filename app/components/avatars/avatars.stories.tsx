// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs, number, select} from '@storybook/addon-knobs';

import {Preferences} from '@mm-redux/constants';
import {UserProfile} from '@mm-redux/types/users';
import {getProfiles} from '@mm-redux/selectors/entities/users';
import Store from '@store/store';

import Avatars from './avatars';

const state = Store.redux?.getState();
const users = getProfiles(state, {});
const userIds = users.map((user:UserProfile) => user.id);

storiesOf('Avatars', module).
    addDecorator(withKnobs).
    add('Avatars', () => (
        <Avatars
            size={number('size', 24, {range: true, min: 16, max: 80, step: 8})}
            userIds={userIds.slice(0, number(`number of named participants (max ${userIds.length})`, userIds.length))}
            theme={select('theme', Preferences.THEMES, Preferences.THEMES.default)}
        />
    ));
