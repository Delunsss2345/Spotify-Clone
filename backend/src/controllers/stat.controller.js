
const asyncHandler = require('@utils/asyncHandler.util');
const StatService = require('@services/stat.service') ;
const getStats = asyncHandler(async (req, res, next) => {
  const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await StatService.getStats() ; 
  res.success(200 , {
    totalSongs,
    totalAlbums,
    totalUsers,
    uniqueArtists
  })
});

module.exports = getStats