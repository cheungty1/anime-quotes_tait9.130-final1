const { AuthorModel, validateAuthor } = require('../../../models/author')
const AnimeModel = require('../../../models/anime')
const authorResolver = {
    //Used to load related data
    AuthorType: {
        animes: (parent, args) => {
            console.log("Author Type");
            return AnimeModel.find({ author: parent._id })
        },
    },
    //Define Author Query
    Query: {
        author: (parent, args) => {
            return AuthorModel.findById(args.id)
        },
        authors: () => {
            return AuthorModel.find()
        },
        searchAuthors: (parent, args) => {
            return AuthorModel.find({ name: new RegExp('^' + args.name + '$', "i") })
        },
    },
    // Define Author Mutation
    Mutation: {
        addAuthor: (parent, args) => {
            console.log(args.input)
            const { error } = validateAuthor(args.input)
            if (error) return error

            let author = new AuthorModel(args.input);
            return author.save()
        },
        deleteAuthor: async (parent, args) => {
            try {
              //{new:true} = If you do not find a id then create one
              return await AuthorModel.findByIdAndRemove(args.id)
            } catch (err) {
              return err
            }
          },

        editAuthor: async (parent, args) => {
            try {
                console.log(args.input.id);
                //{new:true} = If you do not find a id then create one

                const { error } = validateAuthor(args.input)
                if (error) return error

                return await AuthorModel.findByIdAndUpdate(args.input.id, args.input, { new: true })
            } catch (err) {
                return err
            }
        },
    }
};
module.exports = authorResolver