const Mutations = {
    async createItem(parent, args, ctx, info) {
        // TODO: Check if they are logged in

        const item = await ctx.db.mutation.createItem(
            {
                data: {
                    ...args,
                },
            },
            info
        );

        console.log(item);

        return item;
    },
    updateItem(parent, args, ctx, info) {
        // First take  a copy of the updates
        const updates = { ...args };
        // Remove the id from the updates
        delete updates.id;
        // Run the update method
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id,
            },
        }, info);
    },
    async deleteItem(parent, args, ctx, info) {
        const where = { id: args.id };
        // 1. find the item
        const item = await ctx.db.query.item({ where }, '{id, title}');
        // 2. check if they own that item or have the permissions
        // TODO
        // 3. delete the item
        return ctx.db.mutation.deleteItem({ where }, info);
    },
};

module.exports = Mutations;
