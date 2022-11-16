// Import and Destructure Models
const {AnimeModel, validateAnime} = require('../../../models/anime')
const {AuthorModel} = require('../../../models/author')
const animeResolver = {
  //Used to load related data
  AnimeType: {
    author_relate: (parent, args) => {
      console.log("Anime Type");
      return AuthorModel.findById(parent.author)
    },
  },
  //Define Anime Query
  Query: {
    anime: (parent, args) => {
      return AnimeModel.findById(args.id)
    },
    animes: () => {
      return AnimeModel.find()
    },
    searchAnimes: (parent, args) => {
      return AnimeModel.find({ name: new RegExp('^' + args.name + '$', "i") })
    },
  },
  // Define Anime Mutation
  Mutation: {
    addAnime: (parent, args) => {
      const { error } = validateAnime(args.input)
        if (error) return error
       
      let anime = new AnimeModel(args.input)
      return anime.save()
    },
    deleteAnime: async (parent, args) => {
      try {
        //{new:true} = If you do not find a id then create one
        return await AnimeModel.findByIdAndRemove(args.id)
      } catch (err) {
        return err
      }
    },
    editAnime: async (parent, args) => {
      try {
        console.log(args.input.id);

        const { error } = validateAnime(args.input)
        if (error) return error
        
        //{new:true} = If you do not find a id then create one
        return await AnimeModel.findByIdAndUpdate(args.input.id, args.input, { new: true })
      } catch (err) {
        return err
      }
    },
  }
};
//Export AnimeResolver
module.exports = animeResolver
