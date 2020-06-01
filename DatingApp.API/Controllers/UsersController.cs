using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTO;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]PaginationParams userParams)
        {
            var currentUserId=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo=await _repo.GetUser(currentUserId,true);
            userParams.UserId=currentUserId;
            if(string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender=userFromRepo.Gender=="male" ? "female" : "male";
            }

            var users = await _repo.GetUsers(userParams);
            var usersToReturn=_mapper.Map<IEnumerable<UserForListDTO>>(users);
            Response.AddPagination(users.CurrentPage,users.PageSize,users.TotalPages,users.TotalCount);
            return Ok(usersToReturn);            
        }
        [HttpGet("{id}", Name= "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var isCurrentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) == id;
            var user= await _repo.GetUser(id,isCurrentUser);
            var userToReturn= _mapper.Map<UserForDetailedDTO>(user);
            return Ok(userToReturn);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDTO userForUpdate)
        {
            if(id!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var userFromRepo= await _repo.GetUser(id,true);

            _mapper.Map(userForUpdate, userFromRepo);

            if(await _repo.SaveAll())
                return NoContent();
            throw new Exception($"Updating user {id} failed on save");            
        }
        [HttpPost("{id}/like/{recepientId}")]
        public async Task<IActionResult> LikeUser(int id,int recepientId)
        {
            if(id!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
                var like=await _repo.GetLike(id,recepientId);
            if(like!=null)
                return BadRequest("You already liked this member");
            if(await _repo.GetUser(recepientId,true)==null)
                return NotFound();
            like=new Like
            {
                LikerId=id,
                LikeeId=recepientId
            };
            _repo.Add<Like>(like);
            if(await _repo.SaveAll())
                return Ok();
            
            return BadRequest("Failed to like member"); 
            
            

        }
        
    }
}