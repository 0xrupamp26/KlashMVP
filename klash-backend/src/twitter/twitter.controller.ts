import { Controller, Get, Query, Param, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { TwitterService } from './twitter.service';
import { SearchTweetsDto } from './dto/search-tweets.dto';
import { GetUserDto } from './dto/get-user.dto';

@ApiTags('Twitter')
@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search for tweets' })
  @ApiResponse({ status: 200, description: 'Returns matching tweets' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UsePipes(new ValidationPipe({ transform: true }))
  searchTweets(@Query() searchTweetsDto: SearchTweetsDto) {
    return this.twitterService.searchTweets(searchTweetsDto.query, searchTweetsDto.count);
  }

  @Get('user/:username')
  @ApiOperation({ summary: 'Get user profile by username' })
  @ApiParam({ name: 'username', description: 'Twitter username (without @)' })
  @ApiResponse({ status: 200, description: 'Returns user profile' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getUserProfile(@Param() getUserDto: GetUserDto) {
    return this.twitterService.getUserProfile(getUserDto.username);
  }

  @Get('trends')
  @ApiOperation({ summary: 'Get trending topics' })
  @ApiResponse({ status: 200, description: 'Returns trending topics' })
  getTrendingTopics() {
    return this.twitterService.getTrendingTopics();
  }
}
