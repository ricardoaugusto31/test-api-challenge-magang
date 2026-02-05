import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
  @Get('posts/:postId/comments')
  findByPost(@Param('postId') postId: string) {
    return this.commentsService.findByPost(+postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('posts/:postId/comments')
  create(@Param('postId') postId: string, @Body() dto: CreateCommentDto, @Request() req) {
    return this.commentsService.create(+postId, dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('comments/:id')
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto, @Request() req) {
    return this.commentsService.update(+id, dto, req.user.id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete('comments/:id')
  remove(@Param('id') id: string, @Request() req) {
    return this.commentsService.remove(+id, req.user.id);
  }
}