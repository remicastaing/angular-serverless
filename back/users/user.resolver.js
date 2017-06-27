'use strict';
import { User } from './user.model';

export const userResolver = {
    Query: {
        me: (obj, args, context, info) => {
            const id = context.context.user.id;
            return User.findUserById(id).then((user) => {
                return user.forFrontEnd();
            })
                .catch((error) => {
                    return error;
                });


        }
    }
};
